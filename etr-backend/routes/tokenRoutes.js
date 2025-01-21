const express = require('express');
const { claimTokens } = require('../controllers/tokenController');

const router = express.Router();

// Add the route for claiming tokens
router.post('/claim', claimTokens);

module.exports = router;