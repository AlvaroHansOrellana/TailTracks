/**
 * Modelo para la gestión de datos de perros.
 * @module models/perro
 */

const pool = require('../config/db');
const queries = require('../queries/perroQueries');

/**
 * Obtiene todos los perros registrados.
 * @async
 * @function
 * @returns {Promise<Array.<Object>>} Lista de perros.
 * @throws {Error} Error al obtener los datos.
 */
const getAllDogs = async () => {
    try {
        const client = await pool.connect();
        const { rows } = await client.query(queries.getAllDogs);
        return rows;
    } catch (err) {
        throw err;
    }
};

/**
 * Obtiene un perro por su nombre.
 * @async
 * @function
 * @param {string} nombre - Nombre del perro.
 * @returns {Promise<Object>} Datos del perro.
 * @throws {Error} Error al obtener los datos.
 */
const getDogByName = async (nombre) => {
    try {
        const client = await pool.connect();
        const { rows } = await client.query(queries.getDogByName, [nombre]);
        return rows;
    } catch (err) {
        throw err;
    }
};

/**
 * Crea un nuevo perro.
 * @async
 * @function
 * @param {Object} dogData - Datos del perro.
 * @returns {Promise<Object>} Perro creado.
 * @throws {Error} Error al crear el perro.
 */
const createDog = async (dogData) => {
    try {
        const values = Object.values(dogData);
        const { rows } = await pool.query(queries.createDog, values);
        return rows[0];
    } catch (err) {
        throw err;
    }
};

/**
 * Elimina un perro por su ID.
 * @async
 * @function
 * @param {number} id_perro - ID del perro a eliminar.
 * @returns {Promise<Object>} Resultado de la eliminación.
 * @throws {Error} Error al eliminar el perro.
 */
const deleteDog = async (id_perro) => {
    try {
        const { rowCount } = await pool.query(queries.deleteDog, [id_perro]);
        return { rowCount };
    } catch (err) {
        throw err;
    }
};

module.exports = { getAllDogs, getDogByName, createDog, deleteDog };
