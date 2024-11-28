// const jwt = require('jsonwebtoken');
// require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

// const authMiddleware = (req, res, next) => {
//     // Obtener el token desde las cabeceras de la solicitud
//     const token = req.headers['authorization']?.split(' ')[1]; // Formato esperado: "Bearer <token>"

//     if (!token) {
//         // Responder con un código 401 (No autorizado) si no se proporciona el token
//         return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
//     }

//     try {
//         // Verificar el token con la clave secreta
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Clave secreta cargada desde .env

//         // Adjuntar los datos del usuario decodificados al objeto `req` para uso posterior
//         req.user = decoded;

//         // Continuar con el siguiente middleware o controlador
//         next();
//     } catch (err) {
//         // Manejar errores de verificación, como tokens inválidos o expirados
//         return res.status(403).json({ message: 'Token inválido o expirado.' });
//     }
// };

// module.exports = authMiddleware;
