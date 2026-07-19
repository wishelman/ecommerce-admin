const app = require('./app');
const PORT = process.env.PORT || 4000;

async function start() {
  try {
    const mysql = require('mysql2/promise');
    const fs = require('fs');
    const path = require('path');

    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      multipleStatements: true
    });

    const [tables] = await conn.query("SHOW TABLES LIKE 'admins'");
    if (tables.length === 0) {
      console.log('First run — importing database...');
      const sql = fs.readFileSync(path.join(__dirname, 'database.sql'), 'utf8');
      await conn.query(sql);
      console.log('Database imported!');
    } else {
      console.log('Database already exists, skipping import.');
    }
    await conn.end();
  } catch (err) {
    console.log('DB import error:', err.message);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
