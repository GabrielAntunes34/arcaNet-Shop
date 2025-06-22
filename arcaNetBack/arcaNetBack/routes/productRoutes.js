const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, adminOnly, createProduct);
router.patch('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;