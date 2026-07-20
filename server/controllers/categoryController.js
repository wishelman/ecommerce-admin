const Category = require('../models/categoryModel');
const Activity = require('../models/activityModel');

exports.getAll = async (req, res) => {
  try {
    res.json(await Category.getAll());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const category = await Category.getById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Kategori tidak ditemukan' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { category_name, description } = req.body;
    if (!category_name) return res.status(400).json({ message: 'Nama kategori wajib diisi' });
    const id = await Category.create({ category_name, description });
    await Activity.create({ admin_id: 1, activity: `Tambah kategori: ${category_name}` });
    res.status(201).json({ id, message: 'Kategori berhasil ditambahkan' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { category_name, description } = req.body;
    await Category.update(req.params.id, { category_name, description });
    await Activity.create({ admin_id: 1, activity: `Update kategori id ${req.params.id}` });
    res.json({ message: 'Kategori berhasil diupdate' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Category.remove(req.params.id);
    await Activity.create({ admin_id: 1, activity: `Hapus kategori id ${req.params.id}` });
    res.json({ message: 'Kategori berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
