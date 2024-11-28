// const errorHandler = (err, req, res, next) => {
//     console.error('Error:', err.message); // Log del error en la consola

//     res.status(err.status || 500).json({
//         message: err.message || 'Error interno del servidor',
//         error: process.env.NODE_ENV === 'development' ? err : {}, // Muestra el stack solo en desarrollo
//     });
// };

// module.exports = errorHandler;
