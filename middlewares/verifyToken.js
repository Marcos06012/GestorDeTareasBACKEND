import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function verifyToken(req, res, next) {

  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "Se necesita el token" });
  console.log(authHeader);

  const token = authHeader.split(" ")[1];
  console.log("Token recibido:", token);

  // Mejor manejo y diagnóstico: aceptar header "Bearer <token>" o token directo,
  // comprobar que exista la secret y usar try/catch para capturar errores de verificación.
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('JWT_SECRET no está definido en process.env');
    return res.status(500).json({ message: 'Problema de configuración del servidor' });
  }

  // Si el header no tiene formato 'Bearer <token>' intentamos usar el valor completo
  let actualToken = token;
  const parts = authHeader.split(' ');
  if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
    actualToken = parts[1];
  } else if (parts.length === 1) {
    actualToken = parts[0];
  }

  if (!actualToken) {
    console.log('No se encontró token después de parsear el header');
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(actualToken, secret);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Error verificando JWT:', err);
    return res.status(403).json({ message: 'Token inválido' });
  }
};

