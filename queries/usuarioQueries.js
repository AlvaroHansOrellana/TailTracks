const queries = {
    getUserByEmail: `
      SELECT *
      FROM usuario
      WHERE email = $1`,
    getAllUsers: `SELECT * FROM usuario`,
    createUser: `
      INSERT INTO usuario (nombre, email, password, telefono, ubicacion)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
    updateUser: `
        UPDATE usuario
        SET nombre = $1, password = $2, telefono = $3, ubicacion = $4
        WHERE email = $5`,
    deleteUser: `
      DELETE FROM usuario
      WHERE email = $1`,
  }
  
  module.exports = queries;