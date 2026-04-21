const db = require('../config/db');

// Handle emergency blood request submission
const requestBlood = async (req, res) => {
    const { name, email, phone, bloodType, message } = req.body;

    // Validation: Ensure all necessary fields are present
    if (!name || !email || !phone || !bloodType) {
        return res.status(400).json({ error: "Missing required fields for blood request." });
    }

    try {
        const query = `
            INSERT INTO need_blood (name, email, phone, blood_type, message) 
            VALUES (?, ?, ?, ?, ?)
        `;
        
        const [result] = await db.query(query, [name, email, phone, bloodType, message]);

        res.status(201).json({ 
            message: "Emergency blood request submitted successfully!", 
            requestId: result.insertId 
        });
    } catch (err) {
        console.error("Error in nbc.js:", err.message);
        res.status(500).json({ error: "Server error while processing blood request." });
    }
};

module.exports = { requestBlood };