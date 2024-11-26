const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const db = require('./config/db'); // Conexión a la base de datos
const helmet = require ('helmet');
// ! Import de middelwares
const requestLogger = require('./middlewares/requestLogger');
const manage404 = require('./middlewares/manage404');
const errorHandler = require('./middlewares/errorHandler');
const validationMiddleware = require('./middlewares/validationMiddleware')

const routes = require('./routes'); // Archivo central de rutas para tenerlo bien organizadito bb

// ! Variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Base de datos: Ejemplo de inicialización
db.query(
    "INSERT INTO Usuario (nombre, email, contraseña, ubicacion, telefono) VALUES ('Juan Pérez', 'pedros@example.com', '123456', 'Madrid', '123456789')"
)
    .then(() => console.log('Datos insertados correctamente'))
    .catch((err) => console.error('Error al insertar datos:', err));

// ! Uso de los Middlewares
app.use(express.json()); // Parseo de JSON
app.use(express.urlencoded({ extended: true })); // Parseo de datos URL-encoded
app.use(cookieParser()); // Parseo de cookies
app.use(requestLogger);
app.use(errorHandler);
app.use('/public', express.static(path.join(__dirname, 'public'))); // Archivos estáticos
app.use(helmet());

// ! Registrar Rutas
app.use('/api', routes);

// ! Manejo de errores
app.use('*', manage404); // Manejo de rutas no encontradas
app.use(errorHandler); // Manejo global de errores

// ! Iniciar Servidor
app.listen(port, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${port}`);
});
