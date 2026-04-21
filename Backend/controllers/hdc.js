const db = require('../config/db');

// Handle Hosting a Blood Drive submission
const hostDrive = async (req, res) => {
    const { name, email, phone, institute, designation, city, message } = req.body;

    // Validation: Check all required fields from your UI
    if (!name || !email || !phone || !institute || !designation || !city) {
        return res.status(400).json({ error: "Please fill in all required institutional fields." });
    }

    try {
        const query = `
            INSERT INTO host_blood_drive (name, email, phone, institute, designation, city, message) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        
        const [result] = await db.query(query, [name, email, phone, institute, designation, city, message]);

        res.status(201).json({ 
            message: "Blood drive proposal submitted successfully!", 
            driveId: result.insertId 
        });
    } catch (err) {
        console.error("Error in hdc.js:", err.message);
        res.status(500).json({ error: "Internal server error while processing drive request." });
    }
};

module.exports = { hostDrive };