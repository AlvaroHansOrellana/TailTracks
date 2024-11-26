const paseoModel = require('../models/paseo');

// Obtener todos los paseos
const getAllWalks = async (req, res) => {
    try {
        const walks = await paseoModel.getAllWalks();
        res.json(walks);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los paseos', error: err });
    }
};

// Crear un paseo
const createWalk = async (req, res) => {
    try {
        const walk = await paseoModel.createWalk(req.body);
        res.status(201).json(walk);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear el paseo', error: err });
    }
};

// Eliminar un paseo
const deleteWalk = async (req, res) => {
    try {
        await paseoModel.deleteWalk(req.params.id_paseo);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar el paseo', error: err });
    }
};

module.exports = {
    getAllWalks,
    createWalk,
    deleteWalk,
};
