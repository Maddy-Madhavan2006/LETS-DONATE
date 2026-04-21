const express = require('express');
const router = express.Router();
const { submitHelpRequest } = require('../controllers/nhc');

// POST request for the contact/help form
// Full URL: http://localhost:5000/api/need-help/contact
router.post('/contact', submitHelpRequest);

module.exports = router;