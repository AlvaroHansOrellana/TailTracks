const perroModel = require('../models/perro');

// Obtener todos los perros del usuario autenticado
const getAllDogs = async (req, res) => {
    try {
        const dogs = await perroModel.getAllDogsByUser(req.user.id_usuario);
        res.json(dogs);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los perros', error: err });
    }
};

// Obtener un perro por ID
const getDogById = async (req, res) => {
    try {
        const dog = await perroModel.getDogById(req.params.id_perro);
        if (!dog) {
            return res.status(404).json({ message: 'Perro no encontrado' });
        }
        res.json(dog);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener el perro', error: err });
    }
};

// Crear un perro
const createDog = async (req, res) => {
    try {
        const dog = await perroModel.createDog({ ...req.body, id_usuario: req.user.id_usuario });
        res.status(201).json(dog);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear el perro', error: err });
    }
};

// Actualizar un perro
const updateDog = async (req, res) => {
    try {
        const updatedDog = await perroModel.updateDog(req.params.id_perro, req.body);
        res.json(updatedDog);
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar el perro', error: err });
    }
};

// Eliminar un perro
const deleteDog = async (req, res) => {
    try {
        await perroModel.deleteDog(req.params.id_perro);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar el perro', error: err });
    }
};

module.exports = {
    getAllDogs,
    getDogById,
    createDog,
    updateDog,
    deleteDog,
};
