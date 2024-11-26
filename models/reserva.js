const db = require('../config/db');

// Obtener todas las reservas del usuario autenticado
const getAllReservationsByUser = async (id_usuario) => {
    const query = 'SELECT * FROM reservas WHERE id_usuario = $1';
    const { rows } = await db.query(query, [id_usuario]);
    return rows;
};

// Crear una nueva reserva
const createReservation = async (reserva) => {
    const { id_usuario, id_paseo, fecha_reserva } = reserva;
    const query = `
        INSERT INTO reservas (id_usuario, id_paseo, fecha_reserva)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
    const { rows } = await db.query(query, [id_usuario, id_paseo, fecha_reserva]);
    return rows[0];
};

// Actualizar una reserva
const updateReservation = async (id_reserva, updatedData) => {
    const { fecha_reserva } = updatedData;
    const query = `
        UPDATE reservas
        SET fecha_reserva = $1
        WHERE id_reserva = $2
        RETURNING *
    `;
    const { rows } = await db.query(query, [fecha_reserva, id_reserva]);
    return rows[0];
};

// Eliminar una reserva
const deleteReservation = async (id_reserva) => {
    const query = 'DELETE FROM reservas WHERE id_reserva = $1';
    await db.query(query, [id_reserva]);
};

module.exports = {
    getAllReservationsByUser,
    createReservation,
    updateReservation,
    deleteReservation,
};
