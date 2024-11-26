const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');


// Obtener todos los usuarios
router.get('/', usuarioController.getAllUsers);

// Obtener perfil del usuario autenticado
router.get('/profile', authMiddleware, usuarioController.getUserProfile);

// Registrar un nuevo usuario
router.post('/register', usuarioController.registerUser);

// Iniciar sesión
router.post('/login', usuarioController.loginUser);

// Actualizar información del usuario
router.put('/:id_usuario', authMiddleware, usuarioController.updateUser);

// Eliminar usuario
router.delete('/:id_usuario', authMiddleware, usuarioController.deleteUser);



module.exports = router;
