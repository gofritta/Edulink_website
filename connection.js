import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables
// createPool creates the connection and connects it both at a time!
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

export default pool.promise();
