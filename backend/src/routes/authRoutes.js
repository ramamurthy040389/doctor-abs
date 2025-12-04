const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', [
  body('name').notEmpty().withMessage('name is required'),
  body('email').isEmail().withMessage('valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('password must be at least 6 chars'),
], authController.register);

router.post('/login', [
  body('email').isEmail().withMessage('valid email is required'),
  body('password').notEmpty().withMessage('password is required'),
], authController.login);

// GET /api/auth/me  -> returns current user (protected)
router.get('/me', protect, (req, res) => {
  // req.user is set by protect middleware (selects all fields except password)
  res.json({ success: true, data: req.user });
});

module.exports = router;
