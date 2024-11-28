const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Load environment variables
dotenv.config();

// Import route modules
const usuarioRoutes = require('./routes/usuarioRoutes');
const paseoRoutes = require('./routes/paseoRoutes');
const perroRoutes = require('./routes/perroRoutes');
const pagoRoutes = require('./routes/pagoRoutes');

// Middleware
app.use(helmet()); // Security headers
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Custom middleware to log request details
app.use((req, res, next) => {
  console.log('Request URL:', req.url);
  console.log('Request Method:', req.method);
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);
  next();
});

// Routes
app.use('/usuarios', usuarioRoutes);
app.use('/paseos', paseoRoutes);
app.use('/perros', perroRoutes);
app.use('/pagos', pagoRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${port}`);
});