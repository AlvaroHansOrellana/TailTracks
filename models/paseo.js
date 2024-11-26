const db = require('../config/db');

// Obtener todos los paseos disponibles
const getAllWalks = async () => {
    const query = 'SELECT * FROM paseos';
    const { rows } = await db.query(query);
    return rows;
};

// Crear un paseo
const createWalk = async (paseo) => {
    const { id_usuario, ubicacion_inicio, capacidad, precio, estado_pendiente } = paseo;
    const query = `
        INSERT INTO paseos (id_usuario, ubicacion_inicio, capacidad, precio, estado_pendiente)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `;
    const { rows } = await db.query(query, [id_usuario, ubicacion_inicio, capacidad, precio, estado_pendiente]);
    return rows[0];
};

// Eliminar un paseo
const deleteWalk = async (id_paseo) => {
    const query = 'DELETE FROM paseos WHERE id_paseo = $1';
    await db.query(query, [id_paseo]);
};

module.exports = {
    getAllWalks,
    createWalk,
    deleteWalk,
};
