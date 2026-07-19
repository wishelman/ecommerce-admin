const pool = require('../config/db');

const Admin = {
  async findByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
    return rows[0];
  },
  async findById(id) {
    const [rows] = await pool.query('SELECT id, username, fullname, email, created_at FROM admins WHERE id = ?', [id]);
    return rows[0];
  },
  async create({ username, password, fullname, email }) {
    const [result] = await pool.query(
      'INSERT INTO admins (username, password, fullname, email) VALUES (?, ?, ?, ?)',
      [username, password, fullname, email]
    );
    return result.insertId;
  }
};

module.exports = Admin;
