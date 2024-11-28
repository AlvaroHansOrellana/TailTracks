const queries = {
    getAllDogs: `SELECT * FROM perro`,
    createDog: `
    INSERT INTO perro (id_usuario, nombre, edad, raza, peso, foto, comportamiento)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
    getDogByName: `
        SELECT *
        FROM perro
        WHERE nombre = $1`,
    deleteDog: `
      DELETE FROM perro
      WHERE id_perro = $1`,
  }
  

  module.exports = queries;


