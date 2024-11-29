const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');



// Obtener todos los pagos
router.get('/', pagoController.getAllPayments);
// Crear un nuevo pago
router.post('/', pagoController.createPayment);
// Eliminar un pago
router.delete('/:id_pago', pagoController.deletePayment);

module.exports = router;













// const { body, param, query } = require('express-validator');
// const authMiddleware = require('../middlewares/authMiddleware');
// const validationMiddleware = require('../middlewares/validationMiddleware');
// // Obtener todos los pagos del usuario autenticado con filtros opcionales y paginación
// router.get(
//     '/',
//     [
//         query('fecha_inicio')
//             .optional()
//             .isISO8601()
//             .withMessage('La fecha de inicio debe tener un formato válido'),
//         query('fecha_fin')
//             .optional()
//             .isISO8601()
//             .withMessage('La fecha de fin debe tener un formato válido'),
//         query('page')
//             .optional()
//             .isInt({ min: 1 })
//             .withMessage('La página debe ser un número entero mayor a 0'),
//         query('limit')
//             .optional()
//             .isInt({ min: 1 })
//             .withMessage('El límite debe ser un número entero mayor a 0'),
//     ],
//     authMiddleware,
//     validationMiddleware,
//     pagoController.getAllPayments
// );

// // Crear un nuevo pago
// router.post(
//     '/',
//     [
//         body('id_paseo').isInt().withMessage('El ID del paseo debe ser un número entero'),
//         body('cantidad')
//             .isFloat({ gt: 0 })
//             .withMessage('La cantidad debe ser un número mayor a 0'),
//         body('fecha_pago').isISO8601().withMessage('La fecha debe tener un formato válido (ISO 8601)'),
//         body('metodo_pago')
//             .isString()
//             .isLength({ min: 3 })
//             .withMessage('El método de pago debe ser una cadena de al menos 3 caracteres'),
//     ],
//     authMiddleware,
//     validationMiddleware,
//     pagoController.createPayment
// );

// // Actualizar un pago existente
// router.put(
//     '/:id_pago',
//     [
//         param('id_pago').isInt().withMessage('El ID del pago debe ser un número entero'),
//         body('cantidad')
//             .optional()
//             .isFloat({ gt: 0 })
//             .withMessage('La cantidad debe ser un número mayor a 0'),
//         body('fecha_pago')
//             .optional()
//             .isISO8601()
//             .withMessage('La fecha debe tener un formato válido (ISO 8601)'),
//         body('metodo_pago')
//             .optional()
//             .isString()
//             .isLength({ min: 3 })
//             .withMessage('El método de pago debe ser una cadena de al menos 3 caracteres'),
//     ],
//     authMiddleware,
//     validationMiddleware,
//     pagoController.updatePayment
// );

// // Eliminar un pago
// router.delete(
//     '/:id_pago',
//     [param('id_pago').isInt().withMessage('El ID del pago debe ser un número entero')],
//     authMiddleware,
//     validationMiddleware,
//     pagoController.deletePayment
// );


