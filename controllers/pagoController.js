const pagoModel = require('../models/pago');

// Obtener todos los pagos
const getAllPayments = async (req, res) => {
    try {
        const payments = await pagoModel.getAllPaymentsByUser(req.user.id_usuario);
        res.json(payments);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los pagos', error: err });
    }
};

// Crear un pago
const createPayment = async (req, res) => {
    try {
        const payment = await pagoModel.createPayment({
            ...req.body,
            id_usuario: req.user.id_usuario,
        });
        res.status(201).json(payment);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear el pago', error: err });
    }
};

// Actualizar un pago
const updatePayment = async (req, res) => {
    try {
        const updatedPayment = await pagoModel.updatePayment(req.params.id_pago, req.body);
        res.json(updatedPayment);
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar el pago', error: err });
    }
};

// Eliminar un pago
const deletePayment = async (req, res) => {
    try {
        await pagoModel.deletePayment(req.params.id_pago);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar el pago', error: err });
    }
};

module.exports = {
    getAllPayments,
    createPayment,
    updatePayment,
    deletePayment,
};
