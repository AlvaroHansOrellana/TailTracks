import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card"; // Componente para mostrar paseos
import CardDog from "./Perros/CardDog"; // Componente para mostrar perros
import "./Home.scss";

const Home = () => {
  const [paseos, setPaseos] = useState([]);
  const [filteredPaseos, setFilteredPaseos] = useState([]);
  const [perros, setPerros] = useState([]);
  const [filters, setFilters] = useState({
    fecha: "",
    ubicacion: "",
    precioMin: "",
    precioMax: "",
    capacidad: "",
    estado: "",
  });
  const [sortBy, setSortBy] = useState("fecha");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isFiltered, setIsFiltered] = useState(false);

  // Fetch paseos
  useEffect(() => {
    const fetchPaseos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/paseos");
        if (response.data.success && Array.isArray(response.data.walks)) {
          setPaseos(response.data.walks);
        } else {
          console.error("Invalid data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching paseos:", error);
      }
    };

    fetchPaseos();
  }, []);

  // Fetch perros
  useEffect(() => {
    const fetchPerros = async () => {
      try {
        const response = await axios.get("http://localhost:3000/perros");
        if (Array.isArray(response.data)) {
          setPerros(response.data);
        } else {
          console.error("Invalid data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching perros:", error);
      }
    };

    fetchPerros();
  }, []);

  const applyFiltersAndSort = () => {
    let filtered = paseos.filter((paseo) => {
      const paseoDate = new Date(paseo.fecha_hora).toISOString().split("T")[0];
      return (
        (!filters.fecha || paseoDate === filters.fecha) &&
        (!filters.ubicacion ||
          paseo.ubicacion_inicio
            .toLowerCase()
            .includes(filters.ubicacion.toLowerCase())) &&
        (!filters.precioMin ||
          parseFloat(paseo.precio) >= parseFloat(filters.precioMin)) &&
        (!filters.precioMax ||
          parseFloat(paseo.precio) <= parseFloat(filters.precioMax)) &&
        (!filters.capacidad ||
          paseo.capacidad === parseInt(filters.capacidad)) &&
        (filters.estado === "" ||
          (filters.estado === "pendiente" && paseo.estado_pendiente) ||
          (filters.estado === "confirmado" && !paseo.estado_pendiente))
      );
    });

    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "fecha":
          comparison = new Date(a.fecha_hora) - new Date(b.fecha_hora);
          break;
        case "precio":
          comparison = parseFloat(a.precio) - parseFloat(b.precio);
          break;
        case "capacidad":
          comparison = a.capacidad - b.capacidad;
          break;
        default:
          comparison = 0;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    setFilteredPaseos(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterButtonClick = () => {
    const areAllFiltersEmpty = Object.values(filters).every(
      (filter) => filter === ""
    );

    if (!areAllFiltersEmpty) {
      setIsFiltered(true);
      applyFiltersAndSort();
    } else {
      setIsFiltered(false);
      setFilteredPaseos([]);
    }
  };

  const resetFilters = () => {
    setFilters({
      fecha: "",
      ubicacion: "",
      precioMin: "",
      precioMax: "",
      capacidad: "",
      estado: "",
    });
    setIsFiltered(false);
    setFilteredPaseos([]);
  };

  return (
    <div className="home">
      {/* Sección de Paseos */}
      <section className="buscar-paseos-container">
        <h1>Buscar Paseos</h1>
        <div className="filtros">
          <input
            type="date"
            name="fecha"
            value={filters.fecha}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="ubicacion"
            value={filters.ubicacion}
            onChange={handleFilterChange}
            placeholder="Ubicación"
          />
          <input
            type="number"
            name="precioMin"
            value={filters.precioMin}
            onChange={handleFilterChange}
            placeholder="Precio mínimo"
          />
          <input
            type="number"
            name="precioMax"
            value={filters.precioMax}
            onChange={handleFilterChange}
            placeholder="Precio máximo"
          />
          <input
            type="number"
            name="capacidad"
            value={filters.capacidad}
            onChange={handleFilterChange}
            placeholder="Capacidad"
          />
          <select
            name="estado"
            value={filters.estado}
            onChange={handleFilterChange}
          >
            <option value="">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="confirmado">Confirmado</option>
          </select>
        </div>
        <div className="filtros-buttons">
          <button onClick={handleFilterButtonClick}>Aplicar Filtros</button>
          <button onClick={resetFilters}>Resetear Filtros</button>
        </div>

        {isFiltered && filteredPaseos.length > 0 && (
          <div className="paseos-list">
            {filteredPaseos.map((paseo) => (
              <Card key={paseo.id_paseo} paseo={paseo} />
            ))}
          </div>
        )}

        {isFiltered && filteredPaseos.length === 0 && (
          <p>No se encontraron paseos que coincidan con los filtros.</p>
        )}

        {!isFiltered && <p>Use los filtros para buscar paseos disponibles.</p>}
      </section>

      {/* Sección de Perros */}
      {!isFiltered && (
        <section className="lista-perros-container">
          <h1>Lista de Perros</h1>
          <div className="perros-list">
            {perros.map((perro) => (
              <CardDog key={perro.id_perro} perro={perro} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
