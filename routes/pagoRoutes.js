const express = require('express');
const { body, param } = require('express-validator');
const pagoController = require('../controllers/pagoController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');

const router = express.Router();

// Obtener todos los pagos del usuario autenticado
router.get('/', authMiddleware, pagoController.getAllPayments);

// Crear un nuevo pago
router.post(
    '/',
    [
        body('id_paseo').isInt().withMessage('El ID del paseo debe ser un número entero'),
        body('cantidad')
            .isFloat({ gt: 0 })
            .withMessage('La cantidad debe ser un número mayor a 0'),
        body('fecha_pago').isISO8601().withMessage('La fecha debe tener un formato válido (ISO 8601)'),
        body('metodo_pago')
            .isString()
            .isLength({ min: 3 })
            .withMessage('El método de pago debe ser una cadena de al menos 3 caracteres'),
    ],
    authMiddleware,
    validationMiddleware,
    pagoController.createPayment
);

// Actualizar un pago existente
router.put(
    '/:id_pago',
    [
        param('id_pago').isInt().withMessage('El ID del pago debe ser un número entero'),
        body('cantidad')
            .optional()
            .isFloat({ gt: 0 })
            .withMessage('La cantidad debe ser un número mayor a 0'),
        body('fecha_pago')
            .optional()
            .isISO8601()
            .withMessage('La fecha debe tener un formato válido (ISO 8601)'),
        body('metodo_pago')
            .optional()
            .isString()
            .isLength({ min: 3 })
            .withMessage('El método de pago debe ser una cadena de al menos 3 caracteres'),
    ],
    authMiddleware,
    validationMiddleware,
    pagoController.updatePayment
);

// Eliminar un pago
router.delete('/:id_pago', authMiddleware, pagoController.deletePayment);

module.exports = router;
