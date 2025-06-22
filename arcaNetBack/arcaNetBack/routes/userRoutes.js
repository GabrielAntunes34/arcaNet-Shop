const express = require('express');
const router = express.Router();
const {
  getUsers,
  updateUserRole,
  deleteUser,
  updateProfile,
  getCurrentUser
} = require('../controllers/userController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

// Rotas do próprio usuário
router.get('/me', protect, getCurrentUser); // bom para reutilizar
router.patch('/me', protect, updateProfile);

// Admins
router.get('/', protect, adminOnly, getUsers);
router.patch('/:id', protect, adminOnly, updateUserRole);
router.delete('/:id', protect, adminOnly, deleteUser);

module.exports = router;
