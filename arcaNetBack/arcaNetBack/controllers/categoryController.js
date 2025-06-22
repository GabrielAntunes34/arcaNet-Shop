const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

exports.createCategory = async (req, res) => {
  const { name, status } = req.body;
  const exists = await Category.findOne({ name });
  if (exists) return res.status(400).json({ message: 'Category exists' });

  const category = await Category.create({ name, status });
  res.status(201).json(category);
};

exports.updateCategory = async (req, res) => {
  const { name, status } = req.body;
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: 'Not found' });

  category.name = name || category.name;
  category.status = status || category.status;
  await category.save();
  res.json(category);
};

exports.deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: 'Not found' });

  await category.remove();
  res.json({ message: 'Category removed' });
};