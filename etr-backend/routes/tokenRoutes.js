const express = require('express');
const { createPresaleEntry, claimTokens } = require('../controllers/tokenController');

const router = express.Router();

// Test route for debugging
router.get('/test', (req, res) => {
  res.json({ success: true, message: 'Test route working' });
});

// Add the route for creating presale entries
router.post('/create', createPresaleEntry);

// Add the route for claiming tokens
router.post('/claim', claimTokens);

module.exports = router;