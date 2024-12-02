/**
 * Rutas para la gestión de perros.
 * @module routes/perroRoutes
 */

const express = require('express');
const perroController = require('../controllers/perroController');
const router = express.Router();

/**
 * Obtiene todos los perros registrados.
 * @route GET /
 * @group Perros - Operaciones sobre perros
 * @returns {Array.<Object>} 200 - Lista de perros.
 * @returns {Error} 500 - Error interno del servidor.
 */
router.get('/', perroController.getAllDogs);

/**
 * Obtiene un perro por nombre.
 * @route GET /:nombre
 * @group Perros - Operaciones sobre perros
 * @param {string} nombre.path.required - Nombre del perro
 * @returns {Object} 200 - Detalle del perro.
 * @returns {Error} 404 - Perro no encontrado.
 * @returns {Error} 500 - Error interno del servidor.
 */
router.get('/:nombre', perroController.getDogByName);

/**
 * Crea un nuevo perro.
 * @route POST /
 * @group Perros - Operaciones sobre perros
 * @param {Object} perro.body.required - Datos del perro a crear
 * @returns {Object} 201 - Perro creado exitosamente.
 * @returns {Error} 400 - Datos inválidos o incompletos.
 */
router.post('/', perroController.createDog);

/**
 * Elimina un perro por su ID.
 * @route DELETE /:id_perro
 * @group Perros - Operaciones sobre perros
 * @param {number} id_perro.path.required - ID del perro
 * @returns {Object} 200 - Confirmación de eliminación.
 * @returns {Error} 404 - Perro no encontrado.
 * @returns {Error} 500 - Error interno del servidor.
 */
router.delete('/:id_perro', perroController.deleteDog);

module.exports = router;
