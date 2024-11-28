const pool = require('../config/db');
const queries = require('../queries/perroQueries')


// !! Obtener todos los perros
const getAllDogs = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getAllDogs)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
};

// ! Obtener perro por nombre
const getDogByName = async (nombre) => {
    console.log();

    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getDogByName, [nombre])
        result = data.rows

    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
};

// !! 
async function createDog({ id_usuario, nombre, edad, raza, peso, foto, comportamiento }) {
    try {
        const values = [id_usuario, nombre, edad, raza, peso, foto, comportamiento];
        console.log('Model: Executing query with values:', values);
        const result = await pool.query(queries.createDog, values);
        console.log('Model: Query result:', result);
        return result.rows[0];
    } catch (err) {
        console.error("Error executing createDog:", err);
        console.error("Error details:", err.detail);
        throw err;
    }
};

// ! Working 
async function deleteDog(id_perro) {
    try {
        console.log('Model: Deleting dog with ID:', id_perro);
        const result = await pool.query(queries.deleteDog, [id_perro]);
        console.log('Model: Delete result:', result);
        return result;
    } catch (err) {
        console.error("Error executing deleteDog:", err);
        throw err;
    }
};



module.exports = {
     getAllDogs,
     getDogByName,
     createDog,
     deleteDog
};
