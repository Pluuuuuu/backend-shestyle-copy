//initialize db
require('dotenv').config(); // Load environment variables from .env
const mysql = require('mysql2/promise'); //create a connection to the MySQL database.

async function initDatabase() {
    try {
        console.log("DB Config:", process.env.DB_USER, process.env.DB_PASSWORD ? "Has Password" : "No Password"); // Debug

        // Establish Connection
        const connection = await mysql.createConnection({
          host: process.env.DB_HOST || "localhost",
          user: process.env.DB_USER || "root",
          password: process.env.DB_PASSWORD || "", // Ensure it reads the password
          database: process.env.DB_NAME || "shestyle_db",
          port: process.env.DB_PORT || 3306 
        });

        console.log("Connected to MySQL!");

        // await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        const [rows] = await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        console.log("Database created or already exists.");
        
        await connection.end();
    } catch (error) {
        console.error("Error during database initialization:", error);
    }
}

initDatabase();


/* //delete and init database 

require('dotenv').config(); // Load environment variables from .env
const mysql = require('mysql2/promise');

async function initDatabase() {
    try {
        console.log("DB Config:", process.env.DB_USER, process.env.DB_PASSWORD ? "Has Password" : "No Password"); // Debug

        // Connect to MySQL without specifying a database (to drop and recreate it)
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',  // Ensure it reads the password
            port: process.env.DB_PORT || 3306
        });

        console.log("Connected to MySQL!");

        // Drop the existing database (if it exists)
        await connection.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME}`);
        console.log(`Database '${process.env.DB_NAME}' dropped.`);

        // Create a new database
        await connection.query(`CREATE DATABASE ${process.env.DB_NAME}`);
        console.log(`Database '${process.env.DB_NAME}' created.`);

        // Close connection
        await connection.end();
    } catch (error) {
        console.error("Error during database initialization:", error);
    }
}

initDatabase();
*/