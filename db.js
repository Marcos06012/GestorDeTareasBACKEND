import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createPool({
  host: process.env.MYSQLHOST || process.env.DB_HOST,
  user: process.env.MYSQLUSER || process.env.DB_USER,
  password: process.env.MYSQLPASSWORD || process.env.MYSQL_ROOT_PASSWORD || process.env.DB_PASSWORD,
  database: process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || process.env.DB_NAME,
  port: process.env.MYSQLPORT ? parseInt(process.env.MYSQLPORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// EXPORTACIÓN DOBLE: Esto blinda el archivo para que funcione con cualquier tipo de importación
export { db }; // Soporta: import { db } from "../db.js"
export default db; // Soporta: import db from "../db.js"