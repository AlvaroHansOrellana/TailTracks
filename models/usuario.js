const queries = require('../queries/usuarioQueries') // Queries SQL
const pool = require('../config/db');


// !! GET all users
const getAllUsers = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getAllUsers)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
};



// !! GET
const getUserByEmail = async (email) => {
    console.log();

    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getUserByEmail, [email])
        result = data.rows

    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
};



// ! POST
async function createUser({ nombre, email, password, telefono, ubicacion }) {
    try {
        const values = [nombre, email, password, telefono, ubicacion];
        console.log('Model: Executing query with values:', values);
        const result = await pool.query(queries.createUser, values);
        console.log('Model: Query result:', result);
        return result.rows[0];
    } catch (err) {
        console.error("Error executing createUser:", err);
        console.error("Error details:", err.detail);
        throw err;
    }
};

//!! UPDATE
const updateUser = async ({ email, nombre, password, telefono, ubicacion }) => {
    let client, result;
    try {
        client = await pool.connect(); // Conexión al pool
        const values = [nombre, password, telefono, ubicacion, email]; // Orden de parámetros
        const data = await client.query(queries.updateUser, values); // Ejecuta la query
        result = data; // Almacena el resultado
    } catch (err) {
        console.error('Error en el modelo updateUser:', err);
        throw err;
    } finally {
        if (client) client.release(); // Libera la conexión
    }
    return result;
};


// !! DELETE
const deleteUser = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Conexión al pool de la base de datos
        const values = [email]; // Parámetro para la query
        const data = await client.query(queries.deleteUser, values); // Ejecuta la query
        result = data; // Almacena el resultado
    } catch (err) {
        console.error('Error en el modelo deleteUser:', err);
        throw err;
    } finally {
        if (client) client.release(); // Libera la conexión al pool
    }
    return result;
};



module.exports = {
    getUserByEmail,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
};
