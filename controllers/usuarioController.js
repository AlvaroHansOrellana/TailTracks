const usuarioModel = require('../models/usuario');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/tokenService');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await usuarioModel.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error: err });
    }
};

// Obtener perfil del usuario autenticado
const getUserProfile = async (req, res) => {
    try {
        const user = await usuarioModel.getUserById(req.user.id_usuario);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener el perfil del usuario', error: err });
    }
};

// Registrar un usuario
const registerUser = async (req, res) => {
    try {
        const { nombre, email, contraseña, telefono, ubicacion } = req.body;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Formato de email inválido' });
        }
        if (!passwordRegex.test(contraseña)) {
            return res.status(400).json({
                message: 'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y un número.',
            });
        }

        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const user = await usuarioModel.createUser({
            nombre,
            email,
            contraseña: hashedPassword,
            telefono,
            ubicacion,
        });

        res.status(201).json({ message: 'Usuario registrado exitosamente', user });
    } catch (err) {
        res.status(500).json({ message: 'Error al registrar el usuario', error: err });
    }
};

// Iniciar sesión
const loginUser = async (req, res) => {
    try {
        const { email, contraseña } = req.body;

        const user = await usuarioModel.getUserById(email);
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(contraseña, user.contraseña);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const token = generateToken({ id_usuario: user.id_usuario });
        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (err) {
        res.status(500).json({ message: 'Error al iniciar sesión', error: err });
    }
};

// Actualizar usuario
const updateUser = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const updatedUser = await usuarioModel.updateUser(id_usuario, req.body);
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error: err });
    }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        await usuarioModel.deleteUser(id_usuario);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error: err });
    }
};

module.exports = {
    getAllUsers,
    getUserProfile,
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
};
