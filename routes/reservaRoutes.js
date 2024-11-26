const express = require('express');
const { body, param } = require('express-validator');
const reservaController = require('../controllers/reservaController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');

const router = express.Router();

// Obtener todas las reservas del usuario autenticado
router.get('/', authMiddleware, reservaController.getAllReservations);

// Crear una nueva reserva
router.post(
    '/',
    [
        body('id_paseo').isInt().withMessage('El ID del paseo debe ser un número entero'),
        body('fecha_reserva').isISO8601().withMessage('La fecha debe tener un formato válido (ISO 8601)'),
    ],
    authMiddleware,
    validationMiddleware,
    reservaController.createReservation
);

// Actualizar una reserva existente
router.put(
    '/:id_reserva',
    [
        param('id_reserva').isInt().withMessage('El ID de la reserva debe ser un número entero'),
        body('fecha_reserva').isISO8601().withMessage('La fecha debe tener un formato válido (ISO 8601)'),
    ],
    authMiddleware,
    validationMiddleware,
    reservaController.updateReservation
);

// Eliminar una reserva
router.delete('/:id_reserva', authMiddleware, reservaController.deleteReservation);

module.exports = router;
