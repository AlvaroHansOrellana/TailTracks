const queries = {
    // Obtener todos los pagos
    getAllPayments: `
        SELECT * FROM pago;
    `,

    // Crear un nuevo pago
    createPayment: `
        INSERT INTO pago (id_paseo, id_usuario, cantidad, fecha_pago, metodo_pago)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `,

    // Eliminar un pago por ID
    deletePayment: `
        DELETE FROM pago
        WHERE id_pago = $1
        RETURNING *;
    `,
};

module.exports = queries;