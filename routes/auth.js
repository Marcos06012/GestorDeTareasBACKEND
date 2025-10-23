import express from "express";
import { Login, register } from "../controllers/authControl.js";

const router = express.Router();

// 👉 RUTA DE REGISTRO
router.post("/register", register);

// 👉 RUTA DE LOGIN
router.post("/login", Login);


export default router;
