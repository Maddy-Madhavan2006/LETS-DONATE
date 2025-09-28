import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export async function connectDB() {
  try {
    const connection = await mysql.createConnection(process.env.MYSQL_URL);
    console.log("Connected to Railway MySQL!");
    return connection;
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
}
