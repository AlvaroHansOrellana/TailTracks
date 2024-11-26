const express = require('express');
const router = express.Router();

const usuarioRoutes = require('./usuarioRoutes');
const paseoRoutes = require('./paseoRoutes');
const perroRoutes = require('./perroRoutes');
const pagoRoutes = require('./pagoRoutes');

router.use('/usuarios', usuarioRoutes);
router.use('/paseos', paseoRoutes);
router.use('/perros', perroRoutes);
router.use('/pagos', pagoRoutes);

module.exports = router;
