const express = require('express');
const router = express.Router();
const { hostDrive } = require('../controllers/hdc');

// POST request for hosting a drive
// Full URL: http://localhost:5000/api/host-drive/submit
router.post('/submit', hostDrive);

module.exports = router;