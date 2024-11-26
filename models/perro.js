const db = require('../config/db');

// Obtener todos los perros de un usuario
const getAllDogsByUser = async (id_usuario) => {
    const query = 'SELECT * FROM perros WHERE id_usuario = $1';
    const { rows } = await db.query(query, [id_usuario]);
    return rows;
};

// Obtener un perro por ID
const getDogById = async (id_perro) => {
    const query = 'SELECT * FROM perros WHERE id_perro = $1';
    const { rows } = await db.query(query, [id_perro]);
    return rows[0];
};

// Crear un nuevo perro
const createDog = async (perro) => {
    const { id_usuario, nombre, edad, raza, peso, comportamiento } = perro;
    const query = `
        INSERT INTO perros (id_usuario, nombre, edad, raza, peso, comportamiento)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `;
    const { rows } = await db.query(query, [id_usuario, nombre, edad, raza, peso, comportamiento]);
    return rows[0];
};

// Actualizar un perro
const updateDog = async (id_perro, perro) => {
    const { nombre, edad, raza, peso, comportamiento } = perro;
    const query = `
        UPDATE perros
        SET nombre = $1, edad = $2, raza = $3, peso = $4, comportamiento = $5
        WHERE id_perro = $6
        RETURNING *
    `;
    const { rows } = await db.query(query, [nombre, edad, raza, peso, comportamiento, id_perro]);
    return rows[0];
};

// Eliminar un perro
const deleteDog = async (id_perro) => {
    const query = 'DELETE FROM perros WHERE id_perro = $1';
    await db.query(query, [id_perro]);
};

module.exports = {
    getAllDogsByUser,
    getDogById,
    createDog,
    updateDog,
    deleteDog,
};
