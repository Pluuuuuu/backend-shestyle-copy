const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Cart = sequelize.define('Cart', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' } },
  product_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Products', key: 'id' } },
  quantity: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } }
});

module.exports = Cart;

//Cart.belongsTo(User);
//Cart.belongsTo(Product);

