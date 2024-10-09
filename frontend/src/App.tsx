import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import ProductosNuevos from "./components/ProductosNuevos";
import CarritoCompras from "./components/CarritoCompras";
import ConfirmacionDatosPage from "./components/ConfirmacionDatos";
import "./App.css"; // Estilos globales para la app

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar />
        {/* Define las rutas y muestra el Carousel solo en la ruta principal */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Carousel />
                <ProductosNuevos />
              </>
            }
          />
          <Route path="/carrito" element={<CarritoCompras />} />
          <Route path="/confirmacion" element={<ConfirmacionDatosPage />} />
          {/* Agregar más rutas según sea necesario */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
