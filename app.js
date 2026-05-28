import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/usuarios.js";
import taskRoutes from "./routes/tasks.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

//RUTAS DE AUTENTICACIÓN
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", taskRoutes);

//RUTA PRINCIPAL
app.get("/", (req, res) => {
    res.send("API de Gestión de Tareas funcionando :))))");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
}

);
