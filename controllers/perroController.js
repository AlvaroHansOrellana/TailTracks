const perroModel = require('../models/perro');

// !! Obtener todos los perros 
const getAllDogs = async (req, res, next) => {
    try {
        const dogs = await perroModel.getAllDogs();
        res.json(dogs);
    } catch (err) {
        next(new CustomError('Error al obtener los perros', 500));
    }
};

// ! Obtener perro por nombre
const getDogByName = async (req, res) => {
    try {
        const perroNombre = req.params.nombre

        if (!perroNombre) {
            return res.status(400).json({ message: 'Se requiere un nombre para eliminar un perro' });
        }
        const result = await perroModel.getDogByName(perroNombre);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `No se encontró ningún perro con el: ${perroNombre}` });
        }

        res.status(200).json({ nombre: result });
    } catch (error) {
        console.error('Error al eliminar perro:', error);
        res.status(500).json({ message: 'Error al eliminar el perro' });
    }
};

// !!! POST PERROS NUEVOS Y MALOLIENTES
const createDog = async (req, res) => {
    console.log('Controller: Received request body:', req.body);

    const { id_usuario, nombre, edad, raza, peso, foto, comportamiento } = req.body || {};

    if (!id_usuario || !nombre || !edad || !raza || !peso || !foto || !comportamiento) {
        return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" });
    }

    try {
        const newDog = { id_usuario, nombre, edad, raza, peso, foto, comportamiento };
        const response = await perroModel.createDog(newDog);

        res.status(201).json({ success: true, newDog: response });
    } catch (error) {
        console.error("Error al crear el perro:", error);
        res.status(400).json({ success: false, message: error.message || "Error al crear el perro" });
    }
};

// ! Eliminar perro por ID DE PERRO
const deleteDog = async (req, res) => {
    const { id_perro } = req.params;

    if (!id_perro) {
        return res.status(400).json({
            success: false,
            message: "El ID del perro es obligatorio para eliminarlo",
        });
    }

    try {
        const response = await perroModel.deleteDog(id_perro);

        if (response.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontró un perro con el ID proporcionado",
            });
        }

        res.status(200).json({
            success: true,
            message: "Perro eliminado correctamente",
        });
    } catch (error) {
        console.error("Error al eliminar el perro:", error);
        res.status(500).json({
            success: false,
            message: "Error interno al eliminar el perro",
        });
    }
};


module.exports = {
    getAllDogs,
    getDogByName,
    createDog,
    deleteDog
};
