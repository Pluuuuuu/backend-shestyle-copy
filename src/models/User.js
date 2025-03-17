const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const bcrypt = require('bcrypt');


const User = sequelize.define('User', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  name: {
      type: DataTypes.STRING,
      allowNull: false
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
          isEmail: true
      }
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false
  },
  role: {
    type: DataTypes.ENUM('customer', 'admin'),
    defaultValue: 'customer' 
  }
}, {
  hooks: {
      beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) { // Only hash if password is changed
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    }
  }
});

module.exports = User;
// const User = sequelize.define('User', {
//   id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//   name: { type: DataTypes.STRING(100), allowNull: false },
//   email: { type: DataTypes.STRING(255), unique: true, allowNull: false },
//   password: { type: DataTypes.STRING(255), allowNull: false },
//   role: { type: DataTypes.ENUM('admin', 'customer'), defaultValue: 'customer' }
// });


// ✅ Purpose: Ensures passwords are always hashed before saving (for both new users and updates).
// ✅ Security: Prevents storing plain-text passwords.