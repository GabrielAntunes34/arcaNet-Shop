const express = require('express');
const controller = require('../controllers/categoryController');

// Defines CRUD routes for the Category entity at the database

const router = express.Router();

router.get('/', controller.read_category);
router.get('/:id', controller.read_category_id);
router.post('/', controller.create_category);
router.put('/:id', controller.update_category);
router.delete('/:id', controller.delete_category);

module.exports = router;

