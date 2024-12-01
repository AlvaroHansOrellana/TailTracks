import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import PaseoDetalle from "./Home/PaseoDetalle/PaseoDetalle";
import Perros from "./Home/Perros/Perros";
import DogDetails from "./Home/Perros/CardDog/DogDetails/DogDetails"; 

const Main = () => {
  return (
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paseo/:id_paseo" element={<PaseoDetalle />} />
        <Route path="/perros" element={<Perros />} />
        <Route path="/perros/:nombre" element={<DogDetails />} /> {/* Ruta dinámica por nombre */}
      </Routes>
    </main>
  );
};

export default Main;
