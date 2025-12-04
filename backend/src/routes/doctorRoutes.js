const express = require('express');
const router = express.Router();

// GET /api/doctors
router.get('/', (req, res) => {
  res.json({ message: 'doctors list (placeholder)' });
});

// POST /api/doctors
router.post('/', (req, res) => {
  res.status(201).json({ message: 'create doctor (placeholder)' });
});

module.exports = router;
