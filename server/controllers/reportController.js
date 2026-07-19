const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const Activity = require('../models/activityModel');

exports.summary = async (req, res) => {
  try {
    const products = await Product.getAll();
    const categories = await Category.getAll();
    const activities = await Activity.getAll();
    const totalStock = products.reduce((s, p) => s + Number(p.stock || 0), 0);
    const totalValue = products.reduce((s, p) => s + Number(p.price || 0) * Number(p.stock || 0), 0);
    const totalSold = products.reduce((s, p) => s + Number(p.sold || 0), 0);

    const byCategory = categories.map((c) => {
      const items = products.filter((p) => p.category_id === c.id);
      return {
        category: c.category_name,
        count: items.length,
        stock: items.reduce((s, p) => s + Number(p.stock || 0), 0)
      };
    });

    const sorted = [...products].sort((a, b) => Number(b.sold || 0) - Number(a.sold || 0));
    const topSelling = sorted.slice(0, 3);
    const lowSelling = sorted.slice(-3).reverse();

    res.json({
      totalProducts: products.length,
      totalCategories: categories.length,
      totalStock,
      totalValue,
      totalSold,
      byCategory,
      topSelling,
      lowSelling,
      recentActivities: activities.slice(0, 1)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
