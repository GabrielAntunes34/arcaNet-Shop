const Product = require('../models/Product');

exports.processOrder = async (req, res) => {
  const { items } = req.body;
  if (!items || !Array.isArray(items)) return res.status(400).json({ message: 'Invalid items' });

  try {
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) return res.status(404).json({ message: `Product not found: ${item.productId}` });
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${product.name}` });
      }

      product.stock -= item.quantity;
      await product.save();
    }

    return res.status(200).json({ message: 'Order processed successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};