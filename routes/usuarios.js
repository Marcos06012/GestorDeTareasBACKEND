import {me} from "../controllers/usuariosControl.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

const router = express.Router();

// 👉 Ruta protegida (ejemplo)
router.get("/me", verifyToken, me);

export default router;
