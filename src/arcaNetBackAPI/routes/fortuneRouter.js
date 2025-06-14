const express = require('express');
const controller = require('../controllers/fortuneController');
const { authenticate } = require('../middlewares/authMiddleware');
const { canPlayFortune, userWihoutCupon } = require('../middlewares/fortuneMiddleware');

const router = express.Router();

router.get('/draw', authenticate, canPlayFortune, controller.draw_fortune);
router.get('/claim', authenticate, userWihoutCupon, controller.claim_cupon);

module.exports = router;