const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const OrderItem = sequelize.define('OrderItem', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  order_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Orders', key: 'id' } },
  product_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Products', key: 'id' } },
  quantity: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
});

module.exports = OrderItem;
