const express = require('express');
const controller = require('../controllers/userController');
const {authenticate, authorize} = require('../middlewares/authMiddleware');

// Defines CRUD routes for the User entity at the database

const router = express.Router();

// CRUD routes for Admin
router.get('/', authenticate, authorize('admin'), controller.read_user);
router.get('/:id', authenticate, authorize('admin'), controller.read_user_id);
router.post('/', authenticate, authorize('admin'), controller.create_user);
router.put('/:id', authenticate, authorize('admin'), controller.update_user);
router.delete('/:id', authenticate, authorize('admin'), controller.delete_user);

// Special route to be used in the user's own profile page
// This means that clients only will access it if they're
// authenticated and have their own id
//router.get('/me', controller.get_own_user);

module.exports = router;