const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { processOrder } = require('../controllers/orderController');

router.post('/', protect, processOrder);

module.exports = router;