const express = require('express');
const controller = require('../controllers/userController');
const {authenticate, authorize} = require('../middlewares/authMiddleware');

// Defines CRUD routes for the User entity at the database

const router = express.Router();

// Special route to be used in the user's own profile page
// This means that clients will only access it if they're
// authenticated and have their own id
router.get('/me', authenticate, controller.read_own_user);
router.put('/me', authenticate, controller.update_own_user);
router.delete('/me', authenticate, controller.delete_own_user);

// CRUD routes for Admin
router.get('/', authenticate, authorize('admin'), controller.read_user);
router.get('/:id', authenticate, authorize('admin'), controller.read_user_id);
router.post('/', controller.create_user);
router.put('/:id', authenticate, authorize('admin'), controller.update_user);
router.delete('/:id', authenticate, authorize('admin'), controller.delete_user);


module.exports = router;