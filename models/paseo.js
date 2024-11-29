const pool = require('../config/db');
const queries = require('../queries/paseoQueries')

async function getAllWalks() {
    try {
        const result = await pool.query(queries.getAllWalks);
        return result.rows;
    } catch (err) {
        console.error("Error executing getAllWalks:", err);
        throw err;
    }
}

async function createWalk({ id_perro, fecha_hora, ubicacion_inicio, precio, capacidad, estado_pendiente }) {
    try {
        const values = [id_perro, fecha_hora, ubicacion_inicio, precio, capacidad, estado_pendiente];
        const result = await pool.query(queries.createWalk, values);
        return result.rows[0];
    } catch (err) {
        console.error("Error executing createWalk:", err);
        throw err;
    }
}

async function deleteWalk(id_paseo) {
    try {
        const result = await pool.query(queries.deleteWalk, [id_paseo]);
        return result.rows[0];
    } catch (err) {
        console.error("Error executing deleteWalk:", err);
        throw err;
    }
}

module.exports = {
    getAllWalks,
    createWalk,
    deleteWalk,
};
