const express = require('express');
const controller = require('../controllers/cuponController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

// Defines CRUD routes for the cupon entity at the database
// entity at the database

const router = express.Router();

router.get('/', authenticate, authorize('admin'), controller.read_cupon);
router.get('/:id', authenticate, authorize('admin'), controller.read_cupon_id);
router.post('/', authenticate, authorize('admin'), controller.create_cupon);
router.put('/:id', authenticate, authorize('admin'), controller.update_cupon);
router.delete('/:id', authenticate, authorize('admin'), controller.delete_cupon);

/*
Routes without accessControl for Debug:
router.get('/', controller.read_cupon);
router.get('/:id', controller.read_cupon_id);
router.post('/', controller.create_cupon);
router.put('/:id', controller.update_cupon);
router.delete('/:id', controller.delete_cupon);
*/

module.exports = router;