const Product = require('../models/productModel');
const Activity = require('../models/activityModel');

exports.getAll = async (req, res) => {
  try {
    res.json(await Product.getAll());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { category_id, product_name, description, price, stock } = req.body;
    if (!product_name) return res.status(400).json({ message: 'Nama produk wajib diisi' });
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const id = await Product.create({
      category_id: category_id || null,
      product_name,
      description,
      price: price || 0,
      stock: stock || 0,
      image
    });
    await Activity.create({ admin_id: req.admin.id, activity: `Tambah produk: ${product_name}` });
    res.status(201).json({ id, message: 'Produk berhasil ditambahkan' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const existing = await Product.getById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Produk tidak ditemukan' });
    const { category_id, product_name, description, price, stock } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : existing.image;
    await Product.update(req.params.id, {
      category_id: category_id || null,
      product_name,
      description,
      price: price || 0,
      stock: stock || 0,
      image
    });
    await Activity.create({ admin_id: req.admin.id, activity: `Update produk id ${req.params.id}` });
    res.json({ message: 'Produk berhasil diupdate' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Product.remove(req.params.id);
    await Activity.create({ admin_id: req.admin.id, activity: `Hapus produk id ${req.params.id}` });
    res.json({ message: 'Produk berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
