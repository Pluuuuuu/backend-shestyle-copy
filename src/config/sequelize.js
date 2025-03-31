const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(
  process.env.DB_NAME || 'shestyle_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: console.log, // Enable logging to debug
  }
);

// Test connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL database successfully!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
module.exports =  sequelize ;