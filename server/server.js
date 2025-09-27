import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const app = express();

// Allow requests from frontend dev server
app.use(cors({
  origin: ["http://localhost:5173"], // can add more origins later
  methods: ["GET", "POST"]
}));

app.use(express.json());

// Initialize MySQL pool
let db;
(async () => {
  try {
    db = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: 10,
    });
    console.log("✅ Connected to MySQL database!");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
})();

// Logger middleware
app.use((req, res, next) => {
  console.log(`➡ ${req.method} ${req.url}`, req.body);
  next();
});

// Helper: validate required fields
function validateFields(fields) {
  for (const key in fields) {
    if (!fields[key]) return `Field "${key}" is required.`;
  }
  return null;
}

// POST routes
const createEntry = (table, requiredFields) => async (req, res) => {
  const error = validateFields(requiredFields(req.body));
  if (error) return res.status(400).json({ success: false, error });

  const columns = Object.keys(req.body).join(", ");
  const placeholders = Object.keys(req.body).map(_ => "?").join(", ");
  const values = Object.values(req.body);

  try {
    const [result] = await db.execute(
      `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`,
      values
    );
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    console.error(`DB error /${table}:`, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Define routes using helper
app.post("/create-host-blood-drive", createEntry("host_blood_drive", body => ({
  name: body.name,
  email: body.email,
  phone: body.phone,
  institute: body.institute,
  designation: body.designation,
  city: body.city
})));

app.post("/create-donate-blood", createEntry("donate_blood", body => ({
  name: body.name,
  email: body.email,
  phone: body.phone,
  bloodType: body.bloodType
})));

app.post("/create-need-blood", createEntry("need_blood", body => ({
  name: body.name,
  email: body.email,
  phone: body.phone,
  bloodType: body.bloodType
})));

app.post("/insert-new-users", createEntry("new_users", body => ({
  name: body.name,
  email: body.email,
  phone: body.phone,
  date: body.date
})));

// Test route
app.get("/", (req, res) => {
  res.send("LetsDonate backend is running.");
});

// Global error handler (optional, catches unhandled errors)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, error: "Something went wrong!" });
});

// Start server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
