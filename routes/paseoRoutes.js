const express = require('express');
const paseoController = require('../controllers/paseoController');
const router = express.Router();


// Obtener todos los paseos
router.get('/', paseoController.getAllWalks); // !
router.post('/', paseoController.createWalk); // !
router.delete('/:id_paseo', paseoController.deleteWalk);  // !! Delete por el Id del paseo


module.exports = router;








// // Crear un paseo
// router.post(
//     '/',
//     [
//         body('ubicacion_inicio').notEmpty().withMessage('La ubicación inicial es obligatoria'),
//         body('capacidad').isInt({ min: 1 }).withMessage('La capacidad debe ser un número entero mayor a 0'),
//         body('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
//     ],
//     authMiddleware,
//     validationMiddleware,
//     paseoController.createWalk
// );

// // Eliminar un paseo
// router.delete(
//     '/:id_paseo',
//     [
//         param('id_paseo').isInt().withMessage('El ID del paseo debe ser un número entero'),
//     ],
//     authMiddleware,
//     validationMiddleware,
//     paseoController.deleteWalk
// );

// const { body, param } = require('express-validator');
// const authMiddleware = require('../middlewares/authMiddleware');
// const validationMiddleware = require('../middlewares/validationMiddleware');


