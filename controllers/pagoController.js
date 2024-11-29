const pagoModel = require('../models/pago');
const pool = require('../config/db')


// Obtener todos los pagos
const getAllPayments = async (req, res) => {
    try {
        const payments = await pagoModel.getAllPayments();
        res.status(200).json({ success: true, payments });
    } catch (error) {
        console.error("Error fetching payments:", error);
        res.status(500).json({ success: false, message: "Error al obtener los pagos" });
    }
};

// Crear un nuevo pago
const createPayment = async (req, res) => {
    const { id_paseo, id_usuario, cantidad, fecha_pago, metodo_pago } = req.body;

    if (!id_paseo || !id_usuario || !cantidad || !fecha_pago) {
        return res.status(400).json({
            success: false,
            message: "Los campos id_paseo, id_usuario, cantidad y fecha_pago son obligatorios",
        });
    }

    try {
        // Validar si el id_paseo y el id_usuario existen antes de crear el pago
        const paseoExists = await pool.query('SELECT 1 FROM paseo WHERE id_paseo = $1', [id_paseo]);
        if (paseoExists.rowCount === 0) {
            return res.status(400).json({
                success: false,
                message: "El id_paseo proporcionado no existe",
            });
        }

        const userExists = await pool.query('SELECT 1 FROM usuario WHERE id_usuario = $1', [id_usuario]);
        if (userExists.rowCount === 0) {
            return res.status(400).json({
                success: false,
                message: "El id_usuario proporcionado no existe",
            });
        }

        const newPayment = await pagoModel.createPayment({
            id_paseo,
            id_usuario,
            cantidad,
            fecha_pago,
            metodo_pago: metodo_pago || "Desconocido",
        });
        res.status(201).json({ success: true, payment: newPayment });
    } catch (error) {
        console.error("Error creating payment:", error);
        res.status(500).json({ success: false, message: "Error al crear el pago" });
    }
};

// Eliminar un pago
const deletePayment = async (req, res) => {
    const { id_pago } = req.params;

    if (!id_pago) {
        return res.status(400).json({
            success: false,
            message: "El ID del pago es obligatorio para eliminarlo",
        });
    }

    try {
        const deletedPayment = await pagoModel.deletePayment(id_pago);

        if (!deletedPayment) {
            return res.status(404).json({
                success: false,
                message: "No se encontró un pago con el ID proporcionado",
            });
        }

        res.status(200).json({
            success: true,
            message: "Pago eliminado correctamente",
        });
    } catch (error) {
        console.error("Error deleting payment:", error);
        res.status(500).json({ success: false, message: "Error al eliminar el pago" });
    }
};

module.exports = {
    getAllPayments,
    createPayment,
    deletePayment,
};