import { verifyToken } from "../middlewares/verifyToken.js";
import { crearTareas } from "../controllers/tasksControl.js";
import { obtenerTareas } from "../controllers/tasksControl.js";
import express from "express";
import { actualizarTarea } from "../controllers/tasksControl.js";
import { eliminarTarea } from "../controllers/tasksControl.js";

const router = express.Router();

// GET TASKS para lista de Tareas
router.get("/tasks", verifyToken, obtenerTareas);


// POST TASKS para crear nueva tarea
router.post("/tasks", verifyToken, crearTareas);

//PUT TASK para editar tarea
router.put("/tasks/:id", verifyToken, actualizarTarea);

// DELETE TASK para eliminar tarea
router.delete("/tasks/:id", verifyToken, eliminarTarea);


export default router;
