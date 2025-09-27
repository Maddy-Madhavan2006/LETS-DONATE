# LetsDonate Backend Server

This is a simple Node.js + Express backend for the LetsDonate frontend. It connects to a MySQL database (XAMPP) and exposes the required API endpoints for form submissions.

## Setup

1. Make sure XAMPP MySQL is running (port 3306).
2. Create the database and tables (see below for SQL).
3. Edit `.env` if your MySQL root password is not empty.
4. Install dependencies:
   ```powershell
   cd server
   npm install
   ```
5. Start the server:
   ```powershell
   npm start
   ```

The backend will run on port 3001 by default.

## SQL to create database and tables

```sql
CREATE DATABASE IF NOT EXISTS letsdonate_db;
USE letsdonate_db;

CREATE TABLE IF NOT EXISTS new_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  date DATE,
  source VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS host_blood_drive (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  institute VARCHAR(255),
  designation VARCHAR(255),
  city VARCHAR(255),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS donate_blood (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  bloodType VARCHAR(50),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS need_blood (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  bloodType VARCHAR(50),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Endpoints
- POST `/create-host-blood-drive`
- POST `/create-donate-blood`
- POST `/create-need-blood`
- POST `/insert-new-users`

All endpoints accept JSON bodies as used by the frontend.
