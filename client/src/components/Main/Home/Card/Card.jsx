import React from "react";
import { Link } from "react-router-dom";
import "./Card.scss";

const Card = ({ paseo }) => {
  return (
    <div className="card">
      <h2>Paseo #{paseo.id_paseo}</h2>
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
      <Link to={`/paseo/${paseo.id_paseo}`}>Ver detalles</Link>
    </div>
  );
};

export default Card;
