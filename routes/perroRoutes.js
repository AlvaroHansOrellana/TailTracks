const express = require('express');
const { body, param } = require('express-validator');
const perroController = require('../controllers/perroController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');

const router = express.Router();

// Obtener todos los perros del usuario autenticado
router.get('/', authMiddleware, perroController.getAllDogs);

// Obtener un perro por ID
router.get('/:id_perro', authMiddleware, perroController.getDogById);

// Crear un perro
router.post(
    '/',
    [
        body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
        body('edad').isInt({ min: 0 }).withMessage('La edad debe ser un número entero no negativo'),
        body('raza').notEmpty().withMessage('La raza es obligatoria'),
        body('peso').isFloat({ min: 0 }).withMessage('El peso debe ser un número positivo'),
        body('comportamiento').notEmpty().withMessage('El comportamiento es obligatorio'),
    ],
    authMiddleware,
    validationMiddleware,
    perroController.createDog
);

// Actualizar un perro
router.put(
    '/:id_perro',
    [
        param('id_perro').isInt().withMessage('El ID del perro debe ser un número entero'),
        body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
        body('edad').optional().isInt({ min: 0 }).withMessage('La edad debe ser un número entero no negativo'),
        body('raza').optional().notEmpty().withMessage('La raza no puede estar vacía'),
        body('peso').optional().isFloat({ min: 0 }).withMessage('El peso debe ser un número positivo'),
        body('comportamiento').optional().notEmpty().withMessage('El comportamiento no puede estar vacío'),
    ],
    authMiddleware,
    validationMiddleware,
    perroController.updateDog
);

// Eliminar un perro
router.delete('/:id_perro', authMiddleware, perroController.deleteDog);

module.exports = router;
