const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
const Activity = require('../models/activityModel');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username dan password wajib diisi' });
    }
    const admin = await Admin.findByUsername(username);
    if (!admin) {
      return res.status(401).json({ message: 'Username atau password salah' });
    }
    const match = password === admin.password;
    if (!match) {
      return res.status(401).json({ message: 'Username atau password salah' });
    }
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );
    await Activity.create({ admin_id: admin.id, activity: 'Login ke sistem' });
    res.json({
      token,
      admin: { id: admin.id, username: admin.username, fullname: admin.fullname, email: admin.email }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.me = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) return res.status(404).json({ message: 'Admin tidak ditemukan' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
