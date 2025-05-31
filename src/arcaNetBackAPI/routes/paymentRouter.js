const express = require('express');
const controller = require('../controllers/paymentController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, controller.post_payment);

module.exports = router;