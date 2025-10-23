import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";
import dotenv from "dotenv";
dotenv.config();

export async function register(req, res) {
    console.log("📥 Petición recibida en /register");
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        const hashed = await bcrypt.hash(password, 10);

        // Usando el pool promise de mysql2 -> devuelve promesas
        const [result] = await db.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashed]
        );

        const token = jwt.sign(
            { id: result.insertId, email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.json({ message: "Usuario registrado correctamente", token });
    } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ message: "El correo ya está en uso" });
        }
        console.error(err);
        res.status(500).json({ message: `Error en el registro ${err}` });
    }
};

export async function Login(req, res) {
    const { email, password } = req.body;
    console.log("📥 Petición recibida en /login", email);

    if (!email || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        // Usar async/await con el pool promise
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        console.log(rows);

        if (!rows || rows.length === 0) return res.status(400).json({ message: "Usuario no encontrado" });

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: "Contraseña incorrecta" });

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Login exitoso", token, userEmail: email, username: user.name  });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error en el login" });
    }
};