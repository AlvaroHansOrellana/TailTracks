import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./DogDetails.scss";

const DogDetails = () => {
  const { nombre } = useParams(); // Obtenemos el nombre del perro desde la URL
  const [perro, setPerro] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDogDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/perros/${nombre}`); // Cambiamos a búsqueda por nombre
        if (response.data.success && response.data.dog) {
          setPerro(response.data.dog);
        } else {
          setError("No se encontraron detalles del perro.");
        }
      } catch (error) {
        console.error("Error al cargar los detalles del perro:", error);
        setError("Error al cargar los detalles del perro.");
      }
    };

    fetchDogDetails();
  }, [nombre]); // Dependencia basada en el nombre

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!perro) {
    return <p>Cargando detalles del perro...</p>;
  }

  return (
    <div className="dog-details">
      <img src={perro.foto || "placeholder.jpg"} alt={`Imagen de ${perro.nombre}`} />
      <h1>{perro.nombre}</h1>
      <p><strong>Raza:</strong> {perro.raza}</p>
      <p><strong>Edad:</strong> {perro.edad} años</p>
      <p><strong>Peso:</strong> {perro.peso} kg</p>
      <p><strong>Comportamiento:</strong> {perro.comportamiento}</p>
      <p><strong>Dueño:</strong> {perro.nombre_dueño || "No especificado"}</p>
    </div>
  );
};

export default DogDetails;
