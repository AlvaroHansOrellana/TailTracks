const pagoModel = require('../models/pago');



// Obtener todos los pagos del usuario autenticado con filtros y paginación
const getAllPayments = async (req, res) => {
    try {
        const { fecha_inicio, fecha_fin, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const filters = {
            userId: req.user.id_usuario,
            fecha_inicio,
            fecha_fin,
            offset: parseInt(offset, 10),
            limit: parseInt(limit, 10),
        };

        const payments = await pagoModel.getPaymentsByFilters(filters);

        res.status(200).json({
            success: true,
            data: payments,
            pagination: {
                currentPage: parseInt(page, 10),
                limit: parseInt(limit, 10),
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los pagos', error });
    }
};

// Crear un nuevo pago
const createPayment = async (req, res) => {
    try {
        const { id_paseo, cantidad, fecha_pago, metodo_pago } = req.body;
        const newPayment = {
            id_paseo,
            id_usuario: req.user.id_usuario,
            cantidad,
            fecha_pago,
            metodo_pago,
        };

        const payment = await pagoModel.createPayment(newPayment);

        res.status(201).json({
            success: true,
            message: 'Pago creado exitosamente',
            data: payment,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el pago', error });
    }
};

// Actualizar un pago existente
const updatePayment = async (req, res) => {
    try {
        const { id_pago } = req.params;
        const { cantidad, fecha_pago, metodo_pago } = req.body;

        const updatedPayment = await pagoModel.updatePayment(id_pago, {
            cantidad,
            fecha_pago,
            metodo_pago,
        });

        res.status(200).json({
            success: true,
            message: 'Pago actualizado exitosamente',
            data: updatedPayment,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el pago', error });
    }
};

// Eliminar un pago
const deletePayment = async (req, res) => {
    try {
        const { id_pago } = req.params;

        await pagoModel.deletePayment(id_pago);

        res.status(204).json({
            success: true,
            message: 'Pago eliminado exitosamente',
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el pago', error });
    }
};

module.exports = {
    getAllPayments,
    createPayment,
    updatePayment,
    deletePayment,
};
