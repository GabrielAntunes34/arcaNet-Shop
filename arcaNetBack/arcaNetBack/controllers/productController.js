const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  const products = await Product.find().populate('categories');
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('categories');
  if (product) res.json(product);
  else res.status(404).json({ message: 'Product not found' });
};

exports.createProduct = async (req, res) => {
  const { name, description, price, stock, photo, isHighlighted, categories } = req.body;
  const product = new Product({ name, description, price, stock, photo, isHighlighted, categories });
  const created = await product.save();
  res.status(201).json(created);
};

exports.updateProduct = async (req, res) => {
  const { name, description, price, stock, photo, isHighlighted, categories } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price ?? product.price;
  product.stock = stock ?? product.stock;
  product.photo = photo || product.photo;
  product.isHighlighted = isHighlighted ?? product.isHighlighted;
  product.categories = categories || product.categories;

  const updated = await product.save();
  res.json(updated);
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  await product.remove();
  res.json({ message: 'Product removed' });
};