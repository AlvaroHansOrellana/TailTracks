const queries = require('../queries/usuarioQueries') // Queries SQL
const pool = require('../config/db');

// GET
const getUserByEmail = async (email) => {
    console.log();

    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getUSerByEmail, [email])
        result = data.rows

    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// !! GET 
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
}

//UPDATE
const updateUser = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.updateUser, [email])
        result = data.rows

    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
};


// DELETE
const deleteUser = async (usuarioId) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.deleteUser, [usuarioId])
        result = data.rows

    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
};



module.exports = {
    getUserByEmail,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
};
