# Gestor de Tareas - BACKEND

Backend de ejemplo para el gestor de tareas, desarrollado con Node.js, Express y MySQL.  
Proporciona rutas para autenticación de usuarios, gestión de tareas (crear, editar, eliminar, marcar completadas) y protección mediante JWT.

---

##  Requisitos previos
- Node.js v18+
- MySQL
- npm

---

## Tecnologías utilizadas
- Node.js
- Express.js
- MySQL
- dotenv (para variables de entorno)
- bcrypt (para encriptar contraseñas)
- jsonwebtoken (JWT)
- cors
- nodemon

---

##  Instalación y ejecución

1. Clonar el repositorio

```bash
git clone <https://github.com/Marcos06012/GestorDeTareasBACKEND.git>
cd <BackendGestorDeTareasPrueba>
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar de la base de datos
   Ejecutar el archivo  ``` gestortareasBD.SQL ```  en el repositorio

4. Crear archivo .env
   Crear un archivo .env en la raíz del backend con las variables:
   ``` bash
   PORT=3001
   JWT_SECRET=E1ViMEj94B0TQWRFDmc23c8vyve8jFsPpFRRLFQG13D0ksMb1n
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=gestortareas
   
   ```

5. Ejecutar el BACKEND
    ``` npm run dev ```
   - Esto levantará el servidor en: http://localhost:3001
  
  ---

### Funcionalidades principales
Registro e inicio de sesión de usuarios
Creación, edición y eliminación de tareas
Marcado de tareas como completadas
Rutas protegidas mediante JWT
Manejo de errores y validaciones

### Dependencias principales

| Paquete       | Versión (aprox.) | Uso                               |
| ------------- | ---------------- | --------------------------------- |
| express       | ^4               | Servidor HTTP                     |
| mysql2        | ^3               | Conexión con MySQL                |
| dotenv        | ^16              | Variables de entorno              |
| bcrypt        | ^5               | Encriptación de contraseñas       |
| jsonwebtoken  | ^9               | Autenticación JWT                 |
| cors          | ^2               | Manejo de CORS                    |
| nodemon (dev) | ^3               | Reinicio automático en desarrollo |

---
### Desarrollador

Proyecto creado por Marcos Alas como parte del sistema de gestión de tareas con autenticación.
  


   
   
