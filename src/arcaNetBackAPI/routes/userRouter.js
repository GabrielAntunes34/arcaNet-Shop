const express = require('express');
const controller = require('../controllers/userController');

// Defines CRUD routes for the User entity at the database

const router = express.Router();

router.get('/', controller.read_user);
router.get('/:id', controller.read_user_id);
router.post('/', controller.create_user);
router.put('/:id', controller.update_user);
router.delete('/:id', controller.delete_user);

module.exports = router;