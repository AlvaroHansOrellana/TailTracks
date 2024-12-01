import React, { useContext, useState } from "react";
import { DogsContext } from '../../../contexts/DogsContext';
import { PaseosContext } from '../../../contexts/PaseosContext';
import Card from "./Card";
import CardDog from "./Perros/CardDog";
import { useForm } from "react-hook-form";
import "./Home.scss";

const Home = () => {
  const { dogs, loading: loadingDogs } = useContext(DogsContext);
  const { paseos, loading: loadingPaseos } = useContext(PaseosContext);
  const [filteredPaseos, setFilteredPaseos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltered, setIsFiltered] = useState(false); // Update 1
  const itemsPerPage = 10;

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const filtered = paseos.filter((paseo) => {
      const paseoDate = new Date(paseo.fecha_hora).toISOString().split("T")[0];
      return (
        (!data.fecha || paseoDate === data.fecha) &&
        (!data.ubicacion || paseo.ubicacion_inicio.toLowerCase().includes(data.ubicacion.toLowerCase())) &&
        (!data.precioMin || parseFloat(paseo.precio) >= parseFloat(data.precioMin)) &&
        (!data.precioMax || parseFloat(paseo.precio) <= parseFloat(data.precioMax)) &&
        (!data.capacidad || paseo.capacidad === parseInt(data.capacidad)) &&
        (data.estado === "" || (data.estado === "pendiente" && paseo.estado_pendiente) || (data.estado === "confirmado" && !paseo.estado_pendiente))
      );
    });

    setFilteredPaseos(filtered);
    setIsFiltered(true); // Update 2
    setCurrentPage(1);
  };

  const resetFilters = () => { // Update 3
    setIsFiltered(false);
    setFilteredPaseos([]);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = isFiltered
    ? filteredPaseos.slice(indexOfFirstItem, indexOfLastItem)
    : paseos.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loadingDogs || loadingPaseos) return <p>Loading...</p>;

  return (
    <div className="home">
      <section className="buscar-paseos-container">
        <h1>Buscar Paseos</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="filtros">
          <input
            type="date"
            {...register("fecha")}
          />
          <input
            type="text"
            placeholder="Ubicación"
            {...register("ubicacion")}
          />
          <input
            type="number"
            placeholder="Precio mínimo"
            {...register("precioMin", { min: 0 })}
          />
          {errors.precioMin && <span>El precio mínimo debe ser positivo</span>}
          <input
            type="number"
            placeholder="Precio máximo"
            {...register("precioMax", { min: 0 })}
          />
          {errors.precioMax && <span>El precio máximo debe ser positivo</span>}
          <input
            type="number"
            placeholder="Capacidad"
            {...register("capacidad", { min: 1 })}
          />
          {errors.capacidad && <span>La capacidad debe ser al menos 1</span>}
          <select {...register("estado")}>
            <option value="">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="confirmado">Confirmado</option>
          </select>
          <button type="submit">Buscar Paseos</button> {/* Update 4 */}
          <button type="button" onClick={resetFilters}>Resetear Filtros</button>
        </form>

        {isFiltered && (
          <>
            <h2>Resultados de la Búsqueda</h2>
            <div className="paseos-list">
              {currentItems.map((paseo) => (
                <Card key={paseo.id_paseo} paseo={paseo} />
              ))}
            </div>

            {filteredPaseos.length > itemsPerPage && (
              <div className="pagination">
                {Array.from({ length: Math.ceil(filteredPaseos.length / itemsPerPage) }, (_, i) => (
                  <button key={i} onClick={() => paginate(i + 1)}>{i + 1}</button>
                ))}
              </div>
            )}

            {filteredPaseos.length === 0 && (
              <p>No se encontraron paseos que coincidan con los filtros.</p>
            )}
          </>
        )}
      </section>

      {!isFiltered && (
        <section className="lista-perros-container">
          <h1>Lista de Perros</h1>
          <div className="perros-list">
            {dogs.map((perro) => (
              <CardDog key={perro.id_perro} perro={perro} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
