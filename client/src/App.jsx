import React from "react";
import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {

  return (
    <>

      <BrowserRouter>
        <Header />
        <Main />
        <Footer/>
      </BrowserRouter>
     
    </>
  );
};

export default App;
