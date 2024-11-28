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
      SET nombre = $1, email = $2, password = $3, telefono = $4, ubicacion = $5
      WHERE email = $2`,
    deleteUser: `
      DELETE FROM usuario
      WHERE email = $1`,
  }
  
  module.exports = queries;