import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./Home/Home"));
const PaseoDetalle = lazy(() => import("./Home/PaseoDetalle/PaseoDetalle"));
const Perros = lazy(() => import("./Home/Perros/Perros"));
const DogDetails = lazy(() => import("./Home/Perros/CardDog/DogDetails/DogDetails"));

const Main = () => {
  return (
    <main className="main-content">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/paseo/:id_paseo" element={<PaseoDetalle />} />
          <Route path="/perros" element={<Perros />} />
          <Route path="/perros/:nombre" element={<DogDetails />} />
        </Routes>
      </Suspense>
    </main>
  );
};

export default Main;

