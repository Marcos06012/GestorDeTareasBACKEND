import db from "../db.js";
export const me = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT id, name, email FROM users");
        res.json(rows);
    } catch (err) {
        console.error('Error en /me:', err);
        res.status(500).json({ message: "Error al obtener usuarios" });
    }

};