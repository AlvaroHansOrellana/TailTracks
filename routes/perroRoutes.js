const express = require('express');
const router = express.Router();
const perroController = require('../controllers/perroController');
const authMiddleware = require('../middlewares/authMiddleware');

// Obtener todos los perros del usuario autenticado
router.get('/', authMiddleware, perroController.getAllDogs);

// Obtener detalles de un perro por ID
router.get('/:id_perro', authMiddleware, perroController.getDogById);

// Agregar un nuevo perro
router.post('/', authMiddleware, perroController.createDog);

// Actualizar información de un perro
router.put('/:id_perro', authMiddleware, perroController.updateDog);

// Eliminar un perro
router.delete('/:id_perro', authMiddleware, perroController.deleteDog);

module.exports = router;
