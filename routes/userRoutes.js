const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  refreshToken,
} = require('../controllers/userController');

const auth = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorizeRole');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);

// Protected Routes
router.get('/', auth, getAllUsers);
router.get('/:id', auth, getUserById);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);
router.post('/refresh-token', refreshToken);

// ✅ Admin-only route
router.get('/admin/users', auth, authorizeRole('admin'), getAllUsers);

module.exports = router;
