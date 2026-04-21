const express = require('express');
const cors = require('cors');
require('dotenv').config();

// --- 1. Import Routes ---
// Ensure these files exist in your /routes folder
const nbr = require('./routes/nbr.js'); 
const dbr = require('./routes/dbr.js'); 
const nhr = require('./routes/nhr.js'); 
const hdr = require('./routes/hdr.js'); 

const app = express();

// --- 2. Middleware ---
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data (like traditional form submissions)

// --- 3. Route Handling (The "API Bridge") ---
// These prefixes match the Axios URLs we discussed
app.use('/api/need-blood', nbr);
app.use('/api/donate-blood', dbr);
app.use('/api/need-help', nhr);
app.use('/api/host-drive', hdr);

// --- 4. Health Check Route ---
app.get('/', (req, res) => {
    res.status(200).json({ status: "Success", message: "Lets-Donate Backend is active!" });
});

// --- 5. Global Error Handler (Prevents server crashes) ---
app.use((err, req, res, next) => {
    console.error("Critical Server Error:", err.stack);
    res.status(500).json({ error: "Something went wrong on the server!" });
});

// --- 6. Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
});