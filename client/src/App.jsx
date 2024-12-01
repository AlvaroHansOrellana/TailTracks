import React from "react";
import { BrowserRouter } from 'react-router-dom';
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { DogsProvider } from './contexts/DogsContext';
import { PaseosProvider } from './contexts/PaseosContext';
import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <DogsProvider>
        <PaseosProvider>
          <div className="app-container">
            <Header />
            <Main />
            <Footer />
          </div>
        </PaseosProvider>
      </DogsProvider>
    </BrowserRouter>
  );
};

export default App;

