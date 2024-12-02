/**
 * Controlador para gestionar perros.
 * @module controllers/perroController
 */

const perroModel = require('../models/perro');

/**
 * Obtiene todos los perros registrados.
 * @function
 * @async
 * @returns {Promise<void>}
 * @throws {Error} Error al obtener los perros.
 */
const getAllDogs = async (req, res, next) => {
    try {
        const dogs = await perroModel.getAllDogs();
        res.json(dogs);
    } catch (err) {
        next(new CustomError('Error al obtener los perros', 500));
    }
};

/**
 * Obtiene un perro por su nombre.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud.
 * @param {string} req.params.nombre - Nombre del perro.
 * @param {Object} res - Objeto de respuesta.
 * @throws {Error} Error al buscar el perro.
 */
const getDogByName = async (req, res) => {
    try {
        const perroNombre = req.params.nombre;
        const result = await perroModel.getDogByName(perroNombre);

        if (!result.length) {
            return res.status(404).json({ message: `No se encontró ningún perro con el nombre ${perroNombre}` });
        }

        res.status(200).json({ nombre: result });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el perro' });
    }
};

/**
 * Crea un nuevo perro.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} req.body - Datos del perro a crear.
 * @param {Object} res - Objeto de respuesta.
 * @throws {Error} Error al crear el perro.
 */
const createDog = async (req, res) => {
    const { id_usuario, nombre, edad, raza, peso, foto, comportamiento } = req.body;

    try {
        const newDog = await perroModel.createDog({ id_usuario, nombre, edad, raza, peso, foto, comportamiento });
        res.status(201).json({ success: true, newDog });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message || 'Error al crear el perro' });
    }
};

/**
 * Elimina un perro por su ID.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud.
 * @param {number} req.params.id_perro - ID del perro a eliminar.
 * @param {Object} res - Objeto de respuesta.
 * @throws {Error} Error al eliminar el perro.
 */
const deleteDog = async (req, res) => {
    const { id_perro } = req.params;

    try {
        const response = await perroModel.deleteDog(id_perro);

        if (response.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'No se encontró un perro con el ID proporcionado' });
        }

        res.status(200).json({ success: true, message: 'Perro eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error interno al eliminar el perro' });
    }
};

module.exports = { getAllDogs, getDogByName, createDog, deleteDog };
