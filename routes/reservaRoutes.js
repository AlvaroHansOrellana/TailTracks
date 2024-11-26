const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const authMiddleware = require('../middlewares/authMiddleware');

// Obtener todas las reservas del usuario autenticado
router.get('/', authMiddleware, reservaController.getAllReservations);

// Crear una nueva reserva
router.post('/', authMiddleware, reservaController.createReservation);

// Actualizar una reserva existente
router.put('/:id_reserva', authMiddleware, reservaController.updateReservation);

// Eliminar una reserva
router.delete('/:id_reserva', authMiddleware, reservaController.deleteReservation);

module.exports = router;
