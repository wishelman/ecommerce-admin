const pool = require('../config/db');

const Product = {
  async getAll() {
    const [rows] = await pool.query(`
      SELECT p.*, c.category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.id DESC
    `);
    return rows;
  },
  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  },
  async create(data) {
    const [result] = await pool.query(
      `INSERT INTO products (category_id, product_name, description, price, stock, image)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [data.category_id, data.product_name, data.description, data.price, data.stock, data.image]
    );
    return result.insertId;
  },
  async update(id, data) {
    await pool.query(
      `UPDATE products SET category_id = ?, product_name = ?, description = ?, price = ?, stock = ?, image = ?
       WHERE id = ?`,
      [data.category_id, data.product_name, data.description, data.price, data.stock, data.image, id]
    );
  },
  async remove(id) {
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
  }
};

module.exports = Product;
