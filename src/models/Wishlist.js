const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Wishlist = sequelize.define('Wishlist', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' } },
  product_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Products', key: 'id' } }
});

module.exports = Wishlist;
