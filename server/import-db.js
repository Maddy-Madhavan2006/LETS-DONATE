import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const mysqlUrl = process.env.MYSQL_URL;

if (!mysqlUrl) {
  console.error("❌ MYSQL_URL is undefined. Set it in your .env file.");
  process.exit(1);
}

(async () => {
  try {
    const connection = await mysql.createConnection(mysqlUrl);

    // Correct path: look for SQL file inside server/
    const sqlFilePath = path.join(process.cwd(), "letsdonate.sql");
    const sql = fs.readFileSync(sqlFilePath, "utf8");

    const queries = sql.split(/;\s*$/m);

    for (let query of queries) {
      if (query.trim()) await connection.query(query);
    }

    console.log("✅ Database import completed!");
    await connection.end();
  } catch (err) {
    console.error("❌ Import failed:", err);
  }
})();
