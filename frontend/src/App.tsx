import React from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Publicidad from "./components/Publicidad";
import Productos from "./components/Productos";
import "./App.css"; // Archivo CSS global

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Navbar />
      <Publicidad />
      <Productos />
    </div>
  );
};

export default App;
