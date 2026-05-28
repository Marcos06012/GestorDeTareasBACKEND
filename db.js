import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

let db;

// Si existe la URL larga (ideal para Railway en producción), nos conectamos directamente con ella
if (process.env.MYSQL_URL) {
  db = mysql.createPool(process.env.MYSQL_URL);
} else {
  // Si no, usamos los campos individuales (como en tu entorno local)
  db = mysql.createPool({
    host: process.env.MYSQLHOST || process.env.DB_HOST,
    user: process.env.MYSQLUSER || process.env.DB_USER,
    password: process.env.MYSQLPASSWORD || process.env.MYSQL_ROOT_PASSWORD || process.env.DB_PASSWORD,
    database: process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || process.env.DB_NAME,
    port: process.env.MYSQLPORT ? parseInt(process.env.MYSQLPORT) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
}

export { db };
export default db;