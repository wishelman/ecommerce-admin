const pool = require('../config/db');

const Category = {
  async getAll() {
    const [rows] = await pool.query(`
      SELECT c.*, COUNT(p.id) AS product_count
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id
      GROUP BY c.id
      ORDER BY c.id DESC
    `);
    return rows;
  },
  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0];
  },
  async create({ category_name, description }) {
    const [result] = await pool.query(
      'INSERT INTO categories (category_name, description) VALUES (?, ?)',
      [category_name, description]
    );
    return result.insertId;
  },
  async update(id, { category_name, description }) {
    await pool.query(
      'UPDATE categories SET category_name = ?, description = ? WHERE id = ?',
      [category_name, description, id]
    );
  },
  async remove(id) {
    await pool.query('DELETE FROM categories WHERE id = ?', [id]);
  }
};

module.exports = Category;
