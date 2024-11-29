const pool = require('../config/db'); // Configuración de PostgreSQL
const queries = require('../queries/pagoQueries'); // Consultas SQL


async function getAllPayments() {
    try {
        const result = await pool.query(queries.getAllPayments);
        return result.rows;
    } catch (err) {
        console.error("Error executing getAllPayments:", err);
        throw err;  
    }
}

async function createPayment({ id_paseo, id_usuario, cantidad, fecha_pago, metodo_pago }) {
    try {
        const values = [id_paseo, id_usuario, cantidad, fecha_pago, metodo_pago];
        const result = await pool.query(queries.createPayment, values);
        return result.rows[0];
    } catch (err) {
        console.error("Error executing createPayment:", err);
        throw err;
    }
}

async function deletePayment(id_pago) {
    try {
        const result = await pool.query(queries.deletePayment, [id_pago]);
        return result.rows[0];
    } catch (err) {
        console.error("Error executing deletePayment:", err);
        throw err;
    }
}

module.exports = {
    getAllPayments,
    createPayment,
    deletePayment,
};