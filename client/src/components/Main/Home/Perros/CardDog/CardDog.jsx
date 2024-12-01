import React from "react";
import { Link } from "react-router-dom";
import "./CardDog.scss";

const CardDog = ({ perro }) => {
  return (
    <div className="card-dog">
      <Link to={`/perros/${perro.nombre}`} className="dog-link">
        <div className="image-wrapper">
          <img
            src={perro.foto || "placeholder.jpg"}
            alt={`Imagen de ${perro.nombre}`}
            className="dog-image"
          />
        </div>
        <h2>{perro.nombre}</h2>
      </Link>
    </div>
  );
};

export default CardDog;
