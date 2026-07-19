const pool = require('../config/db');

const Activity = {
  async getAll() {
    const [rows] = await pool.query(`
      SELECT a.*, ad.fullname AS admin_name
      FROM activity_logs a
      LEFT JOIN admins ad ON a.admin_id = ad.id
      ORDER BY a.id DESC
    `);
    return rows;
  },
  async create({ admin_id, activity }) {
    const [result] = await pool.query(
      'INSERT INTO activity_logs (admin_id, activity) VALUES (?, ?)',
      [admin_id, activity]
    );
    return result.insertId;
  },
  async clear() {
    await pool.query('DELETE FROM activity_logs');
  }
};

module.exports = Activity;
