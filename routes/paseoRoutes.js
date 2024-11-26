const express = require('express');
const { body, param } = require('express-validator');
const paseoController = require('../controllers/paseoController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');

const router = express.Router();

// Obtener todos los paseos
router.get('/', paseoController.getAllWalks);

// Crear un paseo
router.post(
    '/',
    [
        body('ubicacion_inicio').notEmpty().withMessage('La ubicación inicial es obligatoria'),
        body('capacidad').isInt({ min: 1 }).withMessage('La capacidad debe ser un número entero mayor a 0'),
        body('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
    ],
    authMiddleware,
    validationMiddleware,
    paseoController.createWalk
);

// Eliminar un paseo
router.delete(
    '/:id_paseo',
    [
        param('id_paseo').isInt().withMessage('El ID del paseo debe ser un número entero'),
    ],
    authMiddleware,
    validationMiddleware,
    paseoController.deleteWalk
);

module.exports = router;
