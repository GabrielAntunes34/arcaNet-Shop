const express = require('express');
const controller = require('../controllers/productController');
const {authenticate, authorize} = require('../middlewares/authMiddleware');
const { upload } = require('../middlewares/imageMiddleware');

// Defines CRUD routes for the product entity at the database

const router = express.Router();

router.get('/', controller.read_product);
router.get('/:id', controller.read_product_id);
router.post('/', authenticate, authorize('admin'), controller.create_product);
router.put('/:id', authenticate, authorize('admin'), controller.update_product);
router.delete('/:id', authenticate, authorize('admin'), controller.delete_product);

module.exports = router;