// middlewares/authMiddleware.js
const jwt  = require('jsonwebtoken');
const User = require('../models/User');

/* ---------------------------------------------------------------- */
/* PROTECT – Verifica token JWT e coloca o usuário em req.user       */
/* ---------------------------------------------------------------- */
exports.protect = async (req, res, next) => {
  let token;

  // 1) Verifica se veio em Authorization: Bearer <token>
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // 2) Valida token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Busca usuário (sem a senha)
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

/* ---------------------------------------------------------------- */
/* ADMIN ONLY – Só permite se req.user.role === 'admin'              */
/* ---------------------------------------------------------------- */
exports.adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Admin access required' });
};
