const app = require('./app');
const PORT = process.env.PORT || 4000;

async function start() {
  try {
    const pool = require('./config/db');
    const fs = require('fs');
    const path = require('path');

    const [tables] = await pool.query("SHOW TABLES LIKE 'admins'");
    if (tables.length === 0) {
      console.log('First run — importing database...');
      const sql = fs.readFileSync(path.join(__dirname, 'database.sql'), 'utf8');
      await pool.query(sql);
      console.log('Database imported!');
    } else {
      console.log('Database already exists, skipping import.');
    }
  } catch (err) {
    console.log('DB import error:', err.message);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
