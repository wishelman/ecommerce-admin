const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function importDatabase() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
  });

  console.log('Connected to MySQL. Importing database...');

  const sql = fs.readFileSync(path.join(__dirname, '..', 'database', 'ecommerce.sql'), 'utf8');
  await conn.query(sql);

  const [tables] = await conn.query('SHOW TABLES');
  console.log('Tables:', tables.map(t => Object.values(t)[0]).join(', '));

  await conn.end();
  console.log('Database import complete!');
}

module.exports = importDatabase;
