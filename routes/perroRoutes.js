const express = require('express');
const perroController = require('../controllers/perroController');
const router = express.Router();



// Obtener todos los perros
router.get('/', perroController.getAllDogs);// !
router.get('/:nombre', perroController.getDogByName); // !!
router.post('/', perroController.createDog); // ! 
router.delete('/:id_perro', perroController.deleteDog); // ! Delete por Id de perro




module.exports = router;






















// Crear un nuevo perro
// router.post(
//     '/',
//     [
//         body('nombre').isString().withMessage('El nombre es requerido y debe ser un texto.'),
//         body('raza').isString().withMessage('La raza es requerida y debe ser un texto.'),
//         body('edad').isInt({ min: 0 }).withMessage('La edad debe ser un número entero mayor o igual a 0.'),
//         body('peso').isFloat({ gt: 0 }).withMessage('El peso debe ser un número mayor a 0.'),
//         body('foto').isURL().withMessage('La foto debe ser una URL válida.'),
//         body('comportamiento').isString().withMessage('El comportamiento debe ser un texto.'),
//     ],
//     authMiddleware,
//     validationMiddleware,
//     perroController.createDog
// );


// // Actualizar un perro
// router.put(
//     '/:id_perro',
//     [
//         param('id_perro').isInt().withMessage('El ID del perro debe ser un número entero.'),
//         body('nombre').optional().isString().withMessage('El nombre debe ser un texto.'),
//         body('raza').optional().isString().withMessage('La raza debe ser un texto.'),
//         body('edad').optional().isInt({ min: 0 }).withMessage('La edad debe ser un número entero mayor o igual a 0.'),
//         body('peso').optional().isFloat({ gt: 0 }).withMessage('El peso debe ser un número mayor a 0.'),
//         body('foto').optional().isURL().withMessage('La foto debe ser una URL válida.'),
//         body('comportamiento').optional().isString().withMessage('El comportamiento debe ser un texto.'),
//     ],
//     authMiddleware,
//     validationMiddleware,
//     perroController.updateDog
// );

// // Eliminar un perro
// router.delete(
//     '/:id_perro',
//     param('id_perro').isInt().withMessage('El ID del perro debe ser un número entero.'),
//     authMiddleware,
//     perroController.deleteDog
// );



// const authMiddleware = require('../middlewares/authMiddleware');
// const validationMiddleware = require('../middlewares/validationMiddleware');
// const { body, param } = require('express-validator');


