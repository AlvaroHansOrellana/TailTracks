const express = require('express');
const router = express.Router();
const paseoController = require('../controllers/paseoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Obtener todos los paseos
router.get('/', paseoController.getAllWalks);

// Crear un paseo
router.post('/', authMiddleware, paseoController.createWalk);

// Eliminar un paseo
router.delete('/:id_paseo', authMiddleware, paseoController.deleteWalk);

module.exports = router;
