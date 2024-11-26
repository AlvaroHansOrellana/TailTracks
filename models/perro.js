const db = require('../config/db');

// Crear un nuevo perro
const createDog = async ({ nombre, raza, edad, peso, foto, comportamiento }) => {
    const query = `
        INSERT INTO Perro (nombre, raza, edad, peso, foto, comportamiento)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;
    const result = await db.query(query, [nombre, raza, edad, peso, foto, comportamiento]);
    return result.rows[0];
};

// Obtener todos los perros
const getAllDogs = async () => {
    const query = `
        SELECT * FROM Perro;
    `;
    const result = await db.query(query);
    return result.rows;
};

// Actualizar un perro
const updateDog = async (id_perro, updates) => {
    const setQuery = Object.keys(updates)
        .map((key, index) => `${key} = $${index + 2}`)
        .join(', ');

    const query = `
        UPDATE Perro
        SET ${setQuery}
        WHERE id_perro = $1
        RETURNING *;
    `;
    const values = [id_perro, ...Object.values(updates)];
    const result = await db.query(query, values);
    return result.rows[0];
};

// Eliminar un perro
const deleteDog = async (id_perro) => {
    const query = `
        DELETE FROM Perro
        WHERE id_perro = $1;
    `;
    await db.query(query, [id_perro]);
};

module.exports = {
    createDog,
    getAllDogs,
    updateDog,
    deleteDog,
};
