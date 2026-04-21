const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool to the database
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 4000, // TiDB uses 4000
    
    // Mandatary for TiDB Cloud connections
    ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true 
    },

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Use promise-based wrapper to allow async/await in your controllers
const db = pool.promise();

// Simple test to verify connection status in the console
db.getConnection()
    .then(connection => {
        console.log('✅ Connected to MySQL Database (letsdonate_db)');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Database connection failed:', err.message);
    });

module.exports = db;