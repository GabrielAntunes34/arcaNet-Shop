const express = require('express');
const controller = require('../controllers/productController');

// Defines CRUD routes for the product entity at the database

const router = express.Router();

router.get('/', controller.read_product);
router.get('/:id', controller.read_product_id);
router.post('/', controller.create_product);
router.put('/:id', controller.update_product);
router.delete('/:id', controller.delete_product);

module.exports = router;