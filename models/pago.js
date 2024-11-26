const db = require('../db');

// Obtener todos los pagos de un usuario
const getAllPaymentsByUser = async (id_usuario) => {
    const query = 'SELECT * FROM Pago WHERE id_usuario = $1';
    const result = await db.query(query, [id_usuario]);
    return result.rows;
};

// Crear un pago
const createPayment = async ({ id_usuario, id_paseo, cantidad, fecha_pago, metodo_pago }) => {
    const query = `
        INSERT INTO Pago (id_usuario, id_paseo, cantidad, fecha_pago, metodo_pago)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const result = await db.query(query, [id_usuario, id_paseo, cantidad, fecha_pago, metodo_pago]);
    return result.rows[0];
};

// Actualizar un pago
const updatePayment = async (id_pago, data) => {
    const query = `
        UPDATE Pago
        SET cantidad = $1, fecha_pago = $2, metodo_pago = $3
        WHERE id_pago = $4
        RETURNING *;
    `;
    const result = await db.query(query, [data.cantidad, data.fecha_pago, data.metodo_pago, id_pago]);
    return result.rows[0];
};

// Eliminar un pago
const deletePayment = async (id_pago) => {
    const query = 'DELETE FROM Pago WHERE id_pago = $1';
    await db.query(query, [id_pago]);
};

module.exports = {
    getAllPaymentsByUser,
    createPayment,
    updatePayment,
    deletePayment,
};
