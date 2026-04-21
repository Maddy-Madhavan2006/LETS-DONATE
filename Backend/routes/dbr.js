const express = require('express');
const router = express.Router();
const { scheduleAppointment } = require('../controllers/dbc');

// POST request for scheduling an appointment
// The full URL will be: http://localhost:5000/api/donate-blood/schedule
router.post('/schedule', scheduleAppointment);

module.exports = router;