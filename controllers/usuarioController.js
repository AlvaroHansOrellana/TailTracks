const usuarioModel = require('../models/usuario');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/tokenService');
const CustomError = require('../utils/customError');

// Validaciones con Regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

// Obtener todos los usuarios
const getAllUsers = async (req, res, next) => {
    try {
        const users = await usuarioModel.getAllUsers();
        res.json(users);
    } catch (err) {
        next(new CustomError('Error al obtener los usuarios', 500));
    }
};

// Obtener perfil del usuario autenticado
const getUserProfile = async (req, res, next) => {
    try {
        const user = await usuarioModel.getUserById(req.user.id_usuario);
        if (!user) {
            throw new CustomError('Usuario no encontrado', 404);
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
};

// Registrar un usuario
const registerUser = async (req, res, next) => {
    try {
        const { nombre, email, contraseña, telefono, ubicacion } = req.body;

        if (!emailRegex.test(email)) {
            throw new CustomError('Formato de email inválido', 400);
        }
        if (!passwordRegex.test(contraseña)) {
            throw new CustomError(
                'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, un número y un carácter especial (!@#$%^&*).',
                400
            );
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
        next(err);
    }
};

// Iniciar sesión
const loginUser = async (req, res, next) => {
    try {
        const { email, contraseña } = req.body;

        const user = await usuarioModel.getUserById(email);
        if (!user) {
            throw new CustomError('Credenciales inválidas', 400);
        }

        const isMatch = await bcrypt.compare(contraseña, user.contraseña);
        if (!isMatch) {
            throw new CustomError('Credenciales inválidas', 400);
        }

        const token = generateToken({ id_usuario: user.id_usuario });
        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (err) {
        next(err);
    }
};

// Actualizar usuario
const updateUser = async (req, res, next) => {
    try {
        const { id_usuario } = req.params;
        const updatedUser = await usuarioModel.updateUser(id_usuario, req.body);
        res.json(updatedUser);
    } catch (err) {
        next(err);
    }
};

// Eliminar usuario
const deleteUser = async (req, res, next) => {
    try {
        const { id_usuario } = req.params;
        await usuarioModel.deleteUser(id_usuario);
        res.status(204).send();
    } catch (err) {
        next(err);
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
    