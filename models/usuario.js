const db = require('../config/db');

// Obtener todos los usuarios
const getAllUsers = async () => {
    const query = 'SELECT id_usuario, nombre, email, telefono, ubicacion FROM usuarios';
    const { rows } = await db.query(query);
    return rows;
};

// Obtener un usuario por ID
const getUserById = async (id_usuario) => {
    const query = 'SELECT id_usuario, nombre, email, telefono, ubicacion FROM usuarios WHERE id_usuario = $1';
    const { rows } = await db.query(query, [id_usuario]);
    return rows[0];
};

// Crear un nuevo usuario
const createUser = async (usuario) => {
    const { nombre, email, contraseña, telefono, ubicacion } = usuario;
    const query = `
        INSERT INTO usuarios (nombre, email, contraseña, telefono, ubicacion)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id_usuario, nombre, email, telefono, ubicacion
    `;
    const { rows } = await db.query(query, [nombre, email, contraseña, telefono, ubicacion]);
    return rows[0];
};

// Actualizar un usuario
const updateUser = async (id_usuario, usuario) => {
    const { nombre, email, telefono, ubicacion } = usuario;
    const query = `
        UPDATE usuarios
        SET nombre = $1, email = $2, telefono = $3, ubicacion = $4
        WHERE id_usuario = $5
        RETURNING id_usuario, nombre, email, telefono, ubicacion
    `;
    const { rows } = await db.query(query, [nombre, email, telefono, ubicacion, id_usuario]);
    return rows[0];
};

// Eliminar un usuario
const deleteUser = async (id_usuario) => {
    const query = 'DELETE FROM usuarios WHERE id_usuario = $1';
    await db.query(query, [id_usuario]);
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
