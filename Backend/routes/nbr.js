const express = require('express');
const router = express.Router();
const { requestBlood } = require('../controllers/nbc');

// POST request for emergency blood
// Full URL: http://localhost:5000/api/need-blood/request
router.post('/request', requestBlood);

module.exports = router;