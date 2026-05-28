import db from "../db.js";

export const crearTareas = async (req, res) => {
    console.log(req.user.id)
    const { title, description, fechaInicio, fechaVencimiento } = req.body;
    if (!title || !description || !fechaInicio || !fechaVencimiento) { 
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        const [result] = await db.query("INSERT INTO tasks (title, description, finished_at, user_id) VALUES (?, ?, ?, ?)",
            [title, description, fechaVencimiento, req.user.id],);
        console.log(result);
        return res.json({ message: "Tarea creada correctamente" });


    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Error al crear tarea ${err}` });
    }
}


export const obtenerTareas = async (req, res) => {
    console.log("📥 Petición recibida en /tasks");

    // Usar el id del usuario autenticado (seteado por el middleware)
    const userId = req.user && req.user.id;
    if (!userId) {
        return res.status(401).json({ message: "Usuario no autorizado" });
    }

    try {
        const [tasks] = await db.query("SELECT * FROM tasks WHERE user_id = ?", [userId]);
        // Devolver la lista de tareas directamente
        return res.json(tasks);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: `Error al obtener tareas ${err}` });
    }
};


export const actualizarTarea = async (req, res) => {
    console.log("📥 Petición recibida en /tasks/:id para actualizar tarea");
    const tareaId = req.params.id;
    // Validaciones básicas
    if (!tareaId) {
        return res.status(400).json({ message: "ID de tarea requerido" });
    }

    if (!req.body) {
        return res.status(400).json({ message: "Cuerpo de la petición vacío" });
    }

    const { title, description, fechaInicio, fechaVencimiento, completed} = req.body;

    // Requerir al menos un campo a actualizar
    if (!title && !description && !fechaInicio && !fechaVencimiento) {
        return res.status(400).json({ message: "Al menos un campo debe ser proporcionado para actualizar" });
    }

    try {
        // Usar el pool promise (async/await)
        const [result] = await db.query( 
            "UPDATE tasks SET title = ?, description = ?, created_at = ?, finished_at = ?, completed = ? WHERE id = ? AND user_id = ?",
            [title, description, fechaInicio, fechaVencimiento, completed, tareaId, req.user.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Tarea no encontrada o no pertenece al usuario" });
        }

        return res.json({ message: "Tarea actualizada correctamente" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: `Error al actualizar tarea ${err}` });
    }
};

export const eliminarTarea = async (req, res) => {
    console.log("📥 Petición recibida en /tasks/:id para eliminar tarea");
    const tareaId = req.params.id;
    // Validaciones básicas
    if (!tareaId) {
        return res.status(400).json({ message: "ID de tarea requerido" });
    }

    try {
        // Validar usuario autenticado
        const userId = req.user && req.user.id;
        if (!userId) {
        return res.status(401).json({ message: 'Usuario no autorizado' });
        }

        // Usar el pool promise (async/await) y pasar ambos parámetros
        const [result] = await db.query(
            "DELETE FROM tasks WHERE id = ? AND user_id = ?",
            [tareaId, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Tarea no encontrada o no pertenece al usuario" });
        }

        return res.json({ message: "Tarea eliminada correctamente" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: `Error al eliminar tarea ${err}` });
    }

};


