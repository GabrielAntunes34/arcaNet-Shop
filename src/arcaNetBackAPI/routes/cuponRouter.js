const express = require('express');
const controller = require('../controllers/cuponController');

// Defines CRUD routes for the cupon entity at the database
// entity at the database

const router = express.Router();

router.get('/', controller.read_cupon);
router.get('/:id', controller.read_cupon_id);
router.post('/', controller.create_cupon);
router.put('/:id', controller.update_cupon);
router.delete('/:id', controller.delete_cupon);

module.exports = router;