const queries = {
    // Obtener todos los paseos
    getAllWalks: `
        SELECT * FROM paseo;
    `,

    // Crear un nuevo paseo
    createWalk: `
        INSERT INTO paseo (id_perro, fecha_hora, ubicacion_inicio, precio, capacidad, estado_pendiente)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `,

    // Eliminar un paseo por ID
    deleteWalk: `
        DELETE FROM paseo
        WHERE id_paseo = $1
        RETURNING *;
    `,
    getWalkById: `
        SELECT * FROM paseo
        WHERE id_paseo = $1;
    `,
};

module.exports = queries;
