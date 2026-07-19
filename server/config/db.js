const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || process.env.MYSQLHOST,
  port: process.env.DB_PORT || process.env.MYSQLPORT || 3306,
  user: process.env.DB_USER || process.env.MYSQLUSER,
  password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD,
  database: process.env.DB_NAME || process.env.MYSQLDATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  timezone: '+07:00'
};

console.log('DB host:', dbConfig.host, '| user:', dbConfig.user, '| db:', dbConfig.database);

const pool = mysql.createPool(dbConfig);

module.exports = pool;
