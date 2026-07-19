const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const activityRoutes = require('./routes/activities');
const reportRoutes = require('./routes/reports');

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.get('/api/debug-db', async (req, res) => {
  try {
    const pool = require('./config/db');
    const [rows] = await pool.query('SELECT 1 as ok');
    const [tables] = await pool.query('SHOW TABLES');
    res.json({ connected: true, tables: tables.map(t => Object.values(t)[0]), host: process.env.DB_HOST || process.env.MYSQLHOST });
  } catch (err) {
    res.json({ connected: false, error: err.message, host: process.env.DB_HOST || process.env.MYSQLHOST });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/reports', reportRoutes);

app.use((err, req, res, next) => {
  if (err.message && err.message.includes('gambar')) {
    return res.status(400).json({ message: err.message });
  }
  res.status(500).json({ message: err.message || 'Terjadi kesalahan' });
});

module.exports = app;
