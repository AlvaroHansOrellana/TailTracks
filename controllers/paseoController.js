const paseoModel = require('../models/paseo');
const CustomError = require('../utils/customError');

// Obtener todos los paseos
const getAllWalks = async (req, res, next) => {
    try {
        const walks = await paseoModel.getAllWalks();
        res.json(walks);
    } catch (err) {
        next(new CustomError('Error al obtener los paseos', 500));
    }
};

// Crear un paseo
const createWalk = async (req, res, next) => {
    try {
        const walk = await paseoModel.createWalk(req.body);
        res.status(201).json(walk);
    } catch (err) {
        next(err);
    }
};

// Eliminar un paseo
const deleteWalk = async (req, res, next) => {
    try {
        await paseoModel.deleteWalk(req.params.id_paseo);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllWalks,
    createWalk,
    deleteWalk,
};
