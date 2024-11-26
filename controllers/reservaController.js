const reservaModel = require('../models/reserva');

// Obtener todas las reservas
const getAllReservations = async (req, res) => {
    try {
        const reservations = await reservaModel.getAllReservationsByUser(req.user.id_usuario);
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener las reservas', error: err });
    }
};

// Crear una reserva
const createReservation = async (req, res) => {
    try {
        const reservation = await reservaModel.createReservation({
            ...req.body,
            id_usuario: req.user.id_usuario,
        });
        res.status(201).json(reservation);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear la reserva', error: err });
    }
};

// Actualizar una reserva
const updateReservation = async (req, res) => {
    try {
        const updatedReservation = await reservaModel.updateReservation(req.params.id_reserva, req.body);
        res.json(updatedReservation);
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar la reserva', error: err });
    }
};

// Eliminar una reserva
const deleteReservation = async (req, res) => {
    try {
        await reservaModel.deleteReservation(req.params.id_reserva);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar la reserva', error: err });
    }
};

module.exports = {
    getAllReservations,
    createReservation,
    updateReservation,
    deleteReservation,
};
