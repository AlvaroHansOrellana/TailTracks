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

// Crear un nuevo perro
const createDog = async (req, res) => {
    try {
        const { nombre, raza, edad, peso, foto, comportamiento } = req.body;
        const dog = await perroModel.createDog({
            nombre,
            raza,
            edad,
            peso,
            foto,
            comportamiento,
            id_usuario: req.user.id_usuario,
        });
        res.status(201).json(dog);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear el perro', error: err });
    }
};

// Actualizar un perro existente
const updateDog = async (req, res) => {
    try {
        const { id_perro } = req.params;
        const updates = req.body;
        const updatedDog = await perroModel.updateDog(id_perro, updates);
        res.json(updatedDog);
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar el perro', error: err });
    }
};

// Eliminar un perro
const deleteDog = async (req, res) => {
    try {
        const { id_perro } = req.params;
        await perroModel.deleteDog(id_perro);
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
