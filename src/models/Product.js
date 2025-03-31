const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Product = sequelize.define(
  "Product",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Categories", key: "id" },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: { notEmpty: true },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: true },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0.01,
        isDecimal: {
          msg: "Price must be a decimal number",
        },
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isInt: true,
        min: 0,
      },
    },
    images: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("images");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue("images", JSON.stringify(value));
      },
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "out_of_stock"),
      defaultValue: "active",
    },
    // slug: {
    //   type: DataTypes.STRING(255),
    //   unique: true,
    //   allowNull: false,
    // },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Fix for missing timestamps
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Fix for missing timestamps
    },
  },
  {
    timestamps: true,
    paranoid: true, // Enable soft deletion
    hooks: {
      beforeValidate: (product) => {
        if (product.stock === 0) {
          product.status = "out_of_stock";
        }
      },
    },
  }
);

module.exports = Product;

// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/sequelize');

// const Product = sequelize.define('Product', {
//   id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//   category_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Categories', key: 'id' } },
//   name: { type: DataTypes.STRING(255), allowNull: false },
//   description: { type: DataTypes.TEXT, allowNull: false },
//   price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
//   stock: { type: DataTypes.INTEGER, defaultValue: 0 },
//   images: { type: DataTypes.TEXT, allowNull: true }
// });

// module.exports = Product;
