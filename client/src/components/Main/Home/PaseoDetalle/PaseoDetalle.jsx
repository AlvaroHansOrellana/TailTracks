import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaseoDetalle = () => {
  const { id_paseo } = useParams(); // Cambiado para coincidir con el backend
  const navigate = useNavigate();
  const [paseo, setPaseo] = useState(null);
  const [perros, setPerros] = useState([]);
  const [selectedDog, setSelectedDog] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [paseoResponse, perrosResponse] = await Promise.all([
          axios.get(`http://localhost:3000/paseos/${id_paseo}`), // Aseguramos que use id_paseo
          axios.get("http://localhost:3000/perros"),
        ]);

        if (paseoResponse.data.success) {
          setPaseo(paseoResponse.data.walk);
        } else {
          console.error("Error fetching paseo:", paseoResponse.data.message);
        }

        if (Array.isArray(perrosResponse.data)) {
          setPerros(perrosResponse.data);
        } else {
          console.error("Invalid perros data format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id_paseo]); // Dependencia corregida para id_paseo

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDog) {
      alert("Por favor, selecciona un perro");
      return;
    }

    try {
      await axios.post("http://localhost:3000/paseos", {
        id_paseo: paseo.id_paseo,
        id_perro: selectedDog,
      });
      alert("Paseo creado exitosamente");
      navigate("/");
    } catch (error) {
      console.error("Error creating walk:", error);
      alert("Error al crear el paseo");
    }
  };

  if (!paseo) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Detalles del Paseo</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p>
          <strong>Fecha y Hora:</strong>{" "}
          {new Date(paseo.fecha_hora).toLocaleString()}
        </p>
        <p>
          <strong>Ubicación:</strong> {paseo.ubicacion_inicio}
        </p>
        <p>
          <strong>Precio:</strong> €{paseo.precio}
        </p>
        <p>
          <strong>Capacidad:</strong> {paseo.capacidad}
        </p>
        <p>
          <strong>Estado:</strong>{" "}
          {paseo.estado_pendiente ? "Pendiente" : "Confirmado"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="dog-select"
          >
            Selecciona un perro:
          </label>
          <select
            id="dog-select"
            value={selectedDog}
            onChange={(e) => setSelectedDog(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Selecciona un perro</option>
            {perros.map((perro) => (
              <option key={perro.id_perro} value={perro.id_perro}>
                {perro.nombre}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Crear Paseo
        </button>
      </form>
    </div>
  );
};

export default PaseoDetalle;
