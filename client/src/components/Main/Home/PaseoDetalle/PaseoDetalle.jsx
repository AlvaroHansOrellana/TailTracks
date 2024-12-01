import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-control-geocoder";
import { PaseosContext } from '../../../../contexts/PaseosContext';
import { DogsContext } from '../../../../contexts/DogsContext';
import { useForm } from "react-hook-form";

const PaseoDetalle = () => {
  const { id_paseo } = useParams();
  const navigate = useNavigate();
  const { paseos, loading: loadingPaseos } = useContext(PaseosContext);
  const { dogs, loading: loadingDogs } = useContext(DogsContext);
  const [selectedDog, setSelectedDog] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Encuentra el paseo actual por ID
  const paseo = paseos.find((p) => p.id_paseo === parseInt(id_paseo));

  const onSubmit = async (data) => {
    if (!data.id_perro) {
      alert("Por favor, selecciona un perro");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/paseos/${paseo.id_paseo}/add-dog`,
        { id_perro: parseInt(data.id_perro) }
      );

      if (response.data.success) {
        alert("Perro añadido al paseo exitosamente");
        navigate("/");
      } else {
        alert("Error al añadir el perro al paseo: " + response.data.message);
      }
    } catch (error) {
      console.error("Error adding dog to walk:", error);
      alert("Error al añadir el perro al paseo: " + (error.response?.data?.message || error.message));
    }
  };

  // Validar si los datos aún están cargando
  if (loadingPaseos || loadingDogs) {
    return <div>Cargando...</div>;
  }

  // Validar si no se encuentra el paseo
  if (!paseo) {
    return <div>No se encontró el paseo</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Detalles del Paseo</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p><strong>Fecha y Hora:</strong> {new Date(paseo.fecha_hora).toLocaleString()}</p>
        <p><strong>Ubicación:</strong> {paseo.ubicacion_inicio}</p>
        <p><strong>Precio:</strong> €{paseo.precio}</p>
        <p><strong>Capacidad:</strong> {paseo.capacidad}</p>
        <p><strong>Estado:</strong> {paseo.estado_pendiente ? "Pendiente" : "Confirmado"}</p>
      </div>

      {/* Mapa interactivo */}
      <div className="map-container mb-4" style={{ height: "400px", width: "100%" }}>
        <MapContainer center={[0, 0]} zoom={13} style={{ height: "100%", width: "100%" }}>
          {/* Capa de mapa base */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {/* Marcador dinámico basado en la geocodificación */}
          <Marker
            position={[0, 0]}
            ref={(ref) => {
              if (ref) {
                const geocoder = L.Control.Geocoder.nominatim();
                geocoder.geocode(paseo.ubicacion_inicio, (results) => {
                  if (results.length > 0) {
                    const { center } = results[0];
                    ref.setLatLng(center);
                    ref.bindPopup(`<b>${paseo.ubicacion_inicio}</b>`).openPopup();
                  }
                });
              }
            }}
          />
        </MapContainer>
      </div>

      {/* Formulario para añadir un perro */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dog-select">
            Selecciona un perro:
          </label>
          <select
            id="dog-select"
            {...register("id_perro", { required: "Debes seleccionar un perro" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Selecciona un perro</option>
            {dogs.map((perro) => (
              <option key={perro.id_perro} value={perro.id_perro}>
                {perro.nombre}
              </option>
            ))}
          </select>
          {errors.id_perro && <span className="text-red-500 text-xs italic">{errors.id_perro.message}</span>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Añadir Perro
        </button>
      </form>
    </div>
  );
};

export default PaseoDetalle;
