const usuarioModel = require('../models/usuario');



// ! Obtener todos los usuarios 
const getAllUsers = async (req, res, next) => {
    try {
        const users = await usuarioModel.getAllUsers();
        res.json(users);
    } catch (err) {
        next(new CustomError('Error al obtener los usuarios', 500));
    }
};

// ! Ubicar por correo
const getUserByEmail = async (req, res) => {
    try {
        const usuarioEmail = req.params.email

        if (!usuarioEmail) {
            return res.status(400).json({ message: 'Se requiere un ID para eliminar un usuario' });
        }
        const result = await usuarioModel.getUserByEmail(usuarioEmail);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `No se encontró ningún usuario con el email: ${usuarioEmail}` });
        }

        res.status(200).json({ usuario: result });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
};

// !!!! Create user ===> working
const createUser = async (req, res) => {
    console.log('Controller: Received request body:', req.body);

    const { nombre, email, password, telefono, ubicacion } = req.body || {};

    if (!nombre || !email || !password || !telefono || !ubicacion) {
        return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" });
    }

    try {
        const newUser = { nombre, email, password, telefono, ubicacion };
        const response = await usuarioModel.createUser(newUser);

        res.status(201).json({ success: true, newUser: response });
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(400).json({ success: false, message: error.message || "Error al crear el usuario" });
    }
};




//! working ==> ACTUALIZAR
const updateUser = async (req, res) => {
    try {
        const { email } = req.params; // Email desde la URL
        const { nombre, password, telefono, ubicacion } = req.body; // Datos desde el body

        if (!email) {
            return res.status(400).json({ message: 'Se requiere un email para actualizar el usuario' });
        }

        console.log(`Intentando actualizar el usuario con email: ${email}`);

        const result = await usuarioModel.updateUser({ email, nombre, password, telefono, ubicacion });

        if (result.rowCount === 0) { // Usamos rowCount para verificar filas afectadas
            return res.status(404).json({ message: `No se encontró ningún usuario con el email: ${email}` });
        }

        res.status(200).json({ message: `El usuario con email: ${email} ha sido actualizado correctamente` });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};

// !! BORRAR
const deleteUser = async (req, res) => {
    try {
        const { email } = req.params; // Email desde el parámetro de la URL

        if (!email) {
            return res.status(400).json({ message: 'Se requiere un email para eliminar un usuario' });
        }

        console.log(`Intentando eliminar el usuario con email: ${email}`);

        const result = await usuarioModel.deleteUser(email);

        if (result.rowCount === 0) { // Verifica si se eliminó alguna fila
            return res.status(404).json({ message: `No se encontró ningún usuario con el email: ${email}` });
        }

        res.status(200).json({ message: `El usuario con email: ${email} ha sido eliminado correctamente` });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
};


module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    getUserByEmail
};




// Validaciones con Regex
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
