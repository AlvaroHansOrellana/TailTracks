import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { DogsContext } from '../../../../../../contexts/DogsContext';
import "./DogDetails.scss";

const DogDetails = () => {
  const { nombre } = useParams();
  const { dogs, loading, error } = useContext(DogsContext);

  if (loading) return <p>Loading dog details...</p>;
  if (error) return <p className="error-message">{error}</p>;

  const perro = dogs.find(dog => dog.nombre === nombre);

  if (!perro) return <p>No se encontró el perro.</p>;

  return (
    <div className="dog-details">
      <img src={perro.foto || "/placeholder.jpg"} alt={`Imagen de ${perro.nombre}`} />
      <h1>{perro.nombre}</h1>
      <p><strong>Raza:</strong> {perro.raza}</p>
      <p><strong>Edad:</strong> {perro.edad} años</p>
      <p><strong>Peso:</strong> {perro.peso} kg</p>
      <p><strong>Comportamiento:</strong> {perro.comportamiento}</p>
    </div>
  );
};

export default DogDetails;

