const paseoModel = require('../models/paseo');

// Obtener todos los paseos
const getAllWalks = async (req, res) => {
    try {
        const walks = await paseoModel.getAllWalks();
        res.status(200).json({ success: true, walks });
    } catch (error) {
        console.error("Error fetching walks:", error);
        res.status(500).json({ success: false, message: "Error al obtener los paseos" });
    }
};

// Crear un nuevo paseo
const createWalk = async (req, res) => {
    const { id_perro, fecha_hora, ubicacion_inicio, precio, capacidad, estado_pendiente } = req.body;

    if (!id_perro || !fecha_hora || !precio || !capacidad) {
        return res.status(400).json({
            success: false,
            message: "Los campos id_perro, fecha_hora, precio y capacidad son obligatorios",
        });
    }

    try {
        const newWalk = await paseoModel.createWalk({
            id_perro,
            fecha_hora,
            ubicacion_inicio,
            precio,
            capacidad,
            estado_pendiente: estado_pendiente || true,
        });
        res.status(201).json({ success: true, walk: newWalk });
    } catch (error) {
        console.error("Error creating walk:", error);
        res.status(500).json({ success: false, message: "Error al crear el paseo" });
    }
};

// Eliminar un paseo
const deleteWalk = async (req, res) => {
    const { id_paseo } = req.params;

    if (!id_paseo) {
        return res.status(400).json({
            success: false,
            message: "El ID del paseo es obligatorio para eliminarlo",
        });
    }

    try {
        const deletedWalk = await paseoModel.deleteWalk(id_paseo);
        if (!deletedWalk) {
            return res.status(404).json({
                success: false,
                message: "No se encontró un paseo con el ID proporcionado",
            });
        }
        res.status(200).json({ success: true, message: "Paseo eliminado correctamente" });
    } catch (error) {
        console.error("Error deleting walk:", error);
        res.status(500).json({ success: false, message: "Error al eliminar el paseo" });
    }
};


const getWalkById = async (req, res) => {
    const { id_paseo } = req.params;

    if (!id_paseo) {
        return res.status(400).json({
            success: false,
            message: "El ID del paseo es obligatorio",
        });
    }

    try {
        const walk = await paseoModel.getWalkById(id_paseo);
        if (!walk) {
            return res.status(404).json({
                success: false,
                message: "No se encontró un paseo con el ID proporcionado",
            });
        }
        res.status(200).json({ success: true, walk });
    } catch (error) {
        console.error("Error fetching walk:", error);
        res.status(500).json({ success: false, message: "Error al obtener el paseo" });
    }
};


module.exports = {
    getAllWalks,
    createWalk,
    deleteWalk,
    getWalkById,
};
