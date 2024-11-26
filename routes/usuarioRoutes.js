const express = require('express');
const { body, param } = require('express-validator');
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');

const router = express.Router();

// Obtener todos los usuarios
router.get('/', usuarioController.getAllUsers);

// Obtener perfil del usuario autenticado
router.get('/profile', authMiddleware, usuarioController.getUserProfile);

// Registrar un nuevo usuario
router.post(
    '/register',
    [
        body('nombre').notEmpty().withMessage('El nombre es obligatorio')
            .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
        body('email').isEmail().withMessage('Debe ser un email válido'),
        body('contraseña').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
            .matches(/[A-Z]/).withMessage('Debe incluir al menos una letra mayúscula')
            .matches(/[0-9]/).withMessage('Debe incluir al menos un número'),
        body('telefono').isMobilePhone().withMessage('Debe ser un número de teléfono válido'),
        body('ubicacion').notEmpty().withMessage('La ubicación es obligatoria'),
    ],
    validationMiddleware,
    usuarioController.registerUser
);

// Iniciar sesión
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Debe ser un email válido'),
        body('contraseña').notEmpty().withMessage('La contraseña es obligatoria'),
    ],
    validationMiddleware,
    usuarioController.loginUser
);

// Actualizar información del usuario
router.put(
    '/:id_usuario',
    [
        param('id_usuario').isInt().withMessage('El ID del usuario debe ser un número entero'),
        body('nombre').optional().isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
        body('email').optional().isEmail().withMessage('Debe ser un email válido'),
        body('telefono').optional().isMobilePhone().withMessage('Debe ser un número de teléfono válido'),
        body('ubicacion').optional().notEmpty().withMessage('La ubicación no puede estar vacía'),
    ],
    authMiddleware,
    validationMiddleware,
    usuarioController.updateUser
);

// Eliminar un usuario
router.delete('/:id_usuario', authMiddleware, usuarioController.deleteUser);

module.exports = router;
