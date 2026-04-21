const db = require('../config/db');

// Handle new donation appointment submission
const scheduleAppointment = async (req, res) => {
    const { name, email, phone, bloodType, message } = req.body;

    // Simple validation
    if (!name || !email || !phone || !bloodType) {
        return res.status(400).json({ error: "All fields except message are required." });
    }

    try {
        const query = `
            INSERT INTO donate_blood (name, email, phone, blood_type, message) 
            VALUES (?, ?, ?, ?, ?)
        `;
        
        const [result] = await db.query(query, [name, email, phone, bloodType, message]);

        res.status(201).json({ 
            message: "Appointment scheduled successfully!", 
            appointmentId: result.insertId 
        });
    } catch (err) {
        console.error("Error in dbc.js:", err.message);
        res.status(500).json({ error: "Server error while scheduling appointment." });
    }
};

// Export the function
module.exports = { scheduleAppointment };