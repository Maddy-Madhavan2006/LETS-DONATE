const db = require('../config/db');

// Handle "Need Help" message submission
const submitHelpRequest = async (req, res) => {
    const { name, email, phone, reason, message } = req.body;

    // Validation
    if (!name || !email || !phone || !reason) {
        return res.status(400).json({ error: "Please provide name, email, phone, and reason." });
    }

    try {
        const query = `
            INSERT INTO need_help (name, email, phone, reason, message) 
            VALUES (?, ?, ?, ?, ?)
        `;
        
        const [result] = await db.query(query, [name, email, phone, reason, message]);

        res.status(201).json({ 
            message: "Help request sent successfully!", 
            helpId: result.insertId 
        });
    } catch (err) {
        console.error("Error in nhc.js:", err.message);
        res.status(500).json({ error: "Failed to send help request." });
    }
};

module.exports = { submitHelpRequest };