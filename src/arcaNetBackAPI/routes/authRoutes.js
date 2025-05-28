const express = require('express');
const controller = require('../authController');

const router = express.router();

router.post('/login', controller.login);
router.post('/register', controller.register);

module.exports = router;