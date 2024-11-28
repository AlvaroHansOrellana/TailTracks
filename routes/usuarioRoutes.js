const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();


// Get todos los dichosos usuarios
router.get('/', usuarioController.getAllUsers);  // !
router.get('/:email', usuarioController.getUserByEmail); // !

router.post('/', usuarioController.createUser);



router.put('/:email', usuarioController.updateUser); // Sin terminar
router.delete('/:email', usuarioController.deleteUser);
//

module.exports = router;




















// const validationMiddleware = require('../middlewares/validationMiddleware');
// const authMiddleware = require('../middlewares/authMiddleware');

// const { body, param } = require('express-validator');

// router.post(
//     '/register',
//     [
//         body('nombre')
//             .notEmpty().withMessage('El nombre es obligatorio')
//             .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
//         body('email')
//             .isEmail().withMessage('Debe ser un email válido'),
//         body('contraseña')
//             .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
//             .matches(/[A-Z]/).withMessage('Debe incluir al menos una letra mayúscula')
//             .matches(/\d/).withMessage('Debe incluir al menos un número')
//             .matches(/[!@#$%^&*]/).withMessage('Debe incluir al menos un carácter especial (!@#$%^&*)'),
//         body('telefono')
//             .notEmpty().withMessage('El teléfono es obligatorio'),
//         body('ubicacion')
//             .notEmpty().withMessage('La ubicación es obligatoria'),
//     ],
//     usuarioController.registerUser
// );



// // Registrar un nuevo usuario
// router.post(
//     '/register',
//     [
//         body('nombre')
//             .notEmpty().withMessage('El nombre es obligatorio')
//             .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
//         body('email')
//             .isEmail().withMessage('Debe ser un email válido'),
//         body('contraseña')
//             .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
//             .matches(/[A-Z]/).withMessage('Debe incluir al menos una letra mayúscula')
//             .matches(/\d/).withMessage('Debe incluir al menos un número')
//             .matches(/[!@#$%^&*]/).withMessage('Debe incluir al menos un carácter especial (!@#$%^&*)'),
//         body('telefono')
//             .notEmpty().withMessage('El teléfono es obligatorio'),
//         body('ubicacion')
//             .notEmpty().withMessage('La ubicación es obligatoria'),
//     ],
//     validationMiddleware,
//     usuarioController.registerUser
// );

// // Iniciar sesión
// router.post(
//     '/login',
//     [
//         body('email')
//             .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).withMessage('Debe ser un email válido'),
//         body('contraseña').notEmpty().withMessage('La contraseña es obligatoria'),
//     ],
//     authMiddleware,
//     validationMiddleware,
//     usuarioController.loginUser
// );

// // Actualizar un usuario
// router.put(
//     '/:id_usuario',
//     [
//         param('id_usuario')
//             .isInt().withMessage('El ID del usuario debe ser un número entero'),
//         body('email')
//             .optional().matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).withMessage('Debe ser un email válido'),
//     ],
//     authMiddleware,
//     validationMiddleware,
//     usuarioController.updateUser
// );
