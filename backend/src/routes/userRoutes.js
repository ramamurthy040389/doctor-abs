const express = require('express');
const router = express.Router();

// GET /api/users
router.get('/', (req, res) => {
  res.json({ message: 'users list (placeholder)' });
});

module.exports = router;
