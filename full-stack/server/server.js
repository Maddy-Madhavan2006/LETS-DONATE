import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const app = express();

// Allow requests from frontend
app.use(
  cors({
    origin: ["https://lets-donate.vercel.app/"], // add frontend origins in production
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

// Initialize MySQL pool using Railway URL
let db;
(async () => {
  try {
    if (!process.env.MYSQL_URL) {
      throw new Error("MYSQL_URL is not defined in environment variables!");
    }

    db = await mysql.createPool(process.env.MYSQL_URL);
    console.log("✅ Connected to Railway MySQL database!");
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

// POST routes helper
const createEntry = (table, requiredFields) => async (req, res) => {
  const error = validateFields(requiredFields(req.body));
  if (error) return res.status(400).json({ success: false, error });

  const columns = Object.keys(req.body).join(", ");
  const placeholders = Object.keys(req.body).map(() => "?").join(", ");
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

// POST routes
app.post("/create-host-blood-drive", createEntry("host_blood_drive", (body) => ({
  name: body.name,
  email: body.email,
  phone: body.phone,
  institute: body.institute,
  designation: body.designation,
  city: body.city,
})));

app.post("/create-donate-blood", createEntry("donate_blood", (body) => ({
  name: body.name,
  email: body.email,
  phone: body.phone,
  bloodType: body.bloodType,
})));

app.post("/create-need-blood", createEntry("need_blood", (body) => ({
  name: body.name,
  email: body.email,
  phone: body.phone,
  bloodType: body.bloodType,
})));

app.post("/insert-new-users", createEntry("new_users", (body) => ({
  name: body.name,
  email: body.email,
  phone: body.phone,
  date: body.date,
})));

// GET routes (for fetching submitted data)
app.get("/api/need-blood", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM need_blood");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch need blood entries" });
  }
});

app.get("/api/donate-blood", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM donate_blood");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch donate blood entries" });
  }
});

app.get("/api/host-blood-drive", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM host_blood_drive");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch host blood drive entries" });
  }
});

app.get("/api/new-users", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM new_users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch new users" });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("LetsDonate backend is running.");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, error: "Something went wrong!" });
});

// Start server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
