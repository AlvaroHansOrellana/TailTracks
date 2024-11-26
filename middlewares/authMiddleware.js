const jwt = require('jsonwebtoken');
require('dotenv').config(); // Para cargar la clave secreta desde el archivo .env

const authMiddleware = (req, res, next) => {
    // Obtener el token desde las cabeceras de la solicitud
    const token = req.headers['authorization']?.split(' ')[1]; // Formato esperado: "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Clave secreta desde el archivo .env

        // Adjuntar los datos del usuario decodificados al objeto `req` para uso posterior
        req.user = decoded;

        // Continuar con el siguiente middleware o controlador
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token inválido o expirado.' });
    }
};

module.exports = authMiddleware;
