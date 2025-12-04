const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const appointmentController = require('../controllers/appointmentController');

router.post('/book', protect, appointmentController.book);

module.exports = router;
