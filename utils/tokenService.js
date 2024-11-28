// const jwt = require('jsonwebtoken');

// // Generar un token JWT
// const generateToken = (payload, expiresIn = '1h') => {
//     return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
// };

// // Verificar un token JWT
// const verifyToken = (token) => {
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodifica y verifica el token
//         return { valid: true, expired: false, decoded }; // Token válido
//     } catch (err) {
//         if (err.name === 'TokenExpiredError') {
//             return { valid: false, expired: true, decoded: null }; // Token expirado
//         }
//         return { valid: false, expired: false, decoded: null }; // Token inválido
//     }
// };

// // Decodificar un token sin verificar
// const decodeToken = (token) => {
//     return jwt.decode(token); // Devuelve el payload sin verificar la firma
// };

// module.exports = {
//     generateToken,
//     verifyToken,
//     decodeToken,
// };
