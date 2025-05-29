const express = require('express');
const controller = require('../controllers/categoryController');
const {authenticate, authorize} = require('../middlewares/authMiddleware');


// Defines CRUD routes for the Category entity at the database

const router = express.Router();

router.get('/', controller.read_category);
router.get('/:id', controller.read_category_id);
router.post('/', authenticate, authorize('admin'), controller.create_category);
router.put('/:id', authenticate, authorize('admin'), controller.update_category);
router.delete('/:id', authenticate, authorize('admin'), controller.delete_category);

module.exports = router;

