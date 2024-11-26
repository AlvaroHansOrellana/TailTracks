const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const morgan = require('./middlewares/requestLogger');
const manage404 = require('./middlewares/manage404');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config(); // Variables de entorno

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json()); // Parseo de JSON
app.use(express.urlencoded({ extended: true })); // Parseo de datos URL-encoded
app.use(cookieParser()); // Parseo de cookies
app.use(morgan(':method :url :status - :response-time ms :body')); // Logs con Morgan
app.use('/public', express.static(path.join(__dirname, 'public'))); // Archivos estáticos

// Swagger (Documentación)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Importar Rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const paseoRoutes = require('./routes/paseoRoutes');
const perroRoutes = require('./routes/perroRoutes');
const reservaRoutes = require('./routes/reservaRoutes');

// Registrar Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/paseos', paseoRoutes);
app.use('/api/perros', perroRoutes);
app.use('/api/reservas', reservaRoutes);

// Middlewares para manejo de errores
app.use('*', manage404); // Manejo de rutas no encontradas
app.use(errorHandler); // Manejo global de errores

// Iniciar Servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
