const Activity = require('../models/activityModel');

exports.getAll = async (req, res) => {
  try {
    res.json(await Activity.getAll());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.clear = async (req, res) => {
  try {
    await Activity.clear();
    res.json({ message: 'Log aktivitas dibersihkan' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
