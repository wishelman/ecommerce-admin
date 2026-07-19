const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

console.log('ENV check — DB_HOST:', process.env.DB_HOST, '| MYSQLHOST:', process.env.MYSQLHOST, '| CLIENT_ORIGIN:', process.env.CLIENT_ORIGIN);

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
