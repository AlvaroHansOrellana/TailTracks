import React, { useState, useEffect } from "react";
import axios from "axios";
import CardDog from "./CardDog";
import "./Perros.scss";

const Perros = () => {
  const [perros, setPerros] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerros = async () => {
      try {
        const response = await axios.get("http://localhost:3000/perros");
        if (response.data.success && Array.isArray(response.data.dogs)) {
          setPerros(response.data.dogs);
        } else {
          console.error("Invalid response format", response.data);
          setError("Error en el formato de los datos recibidos.");
        }
      } catch (error) {
        console.error("Error fetching perros:", error);
        setError("Error al cargar la lista de perros. Inténtalo más tarde.");
      }
    };

    fetchPerros();
  }, []);

  return (
    <div className="perros-container">
      <h1>Lista de Perros</h1>
      {error && <p className="error-message">{error}</p>}
      {perros.length > 0 ? (
        <div className="perros-list">
          {perros.map((perro) => (
            <CardDog key={perro.id_perro} perro={perro} />
          ))}
        </div>
      ) : (
        <p className="no-perros">No hay perros disponibles en este momento.</p>
      )}
    </div>
  );
};

export default Perros;
