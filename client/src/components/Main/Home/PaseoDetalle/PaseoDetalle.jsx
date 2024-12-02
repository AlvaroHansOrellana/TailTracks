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
import { Rings } from 'react-loader-spinner'

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
    return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px", // Adjust as needed
        width: "200px",  // Adjust as needed
        margin: "auto", // Centers the container within a parent element
        border: "1px solid transparent", // Optional, just for visibility during testing
      }}
    >
      <Rings
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="rings-loading"
      />
    </div>
  );}

  // Validar si no se encuentra el paseo
  if (!paseo) {
    return <div>No se encontró el paseo</div>;
  }

  return (
    <div className="paseos">
      <h1 className="detallesMuchos">Detalles del Paseo</h1>
      <div className="detalles2">
        <p><strong>Fecha y Hora:</strong> {new Date(paseo.fecha_hora).toLocaleString()}</p>
        <p><strong>Ubicación:</strong> {paseo.ubicacion_inicio}</p>
        <p><strong>Precio:</strong> €{paseo.precio}</p>
        <p><strong>Capacidad:</strong> {paseo.capacidad}</p>
        <p><strong>Estado:</strong> {paseo.estado_pendiente ? "Pendiente" : "Confirmado"}</p>
      </div>

      {/* Mapa interactivo */}
      <div className="mapita" style={{ height: "300px", width: "100%" }}>
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
      <form onSubmit={handleSubmit(onSubmit)} className="formas">
        <div className="formas2">
          <label className="selecciona">
            Selecciona un perro:
          </label>
          <select
            id="dog-select"
            {...register("id_perro", { required: "Debes seleccionar un perro" })}
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
          className="botonsito"
        >
          Añadir Perro
        </button>
      </form>
    </div>
  );
};

export default PaseoDetalle;
