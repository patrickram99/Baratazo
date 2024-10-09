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
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="space-y-8">
                  <section className="bg-white rounded-lg shadow-md overflow-hidden">
                    <Carousel />
                  </section>
                  <section className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4">
                      Productos Nuevos
                    </h2>
                    <ProductosNuevos />
                  </section>
                </div>
              }
            />
            <Route
              path="/carrito"
              element={
                <div className="bg-white rounded-lg shadow-md p-6">
                  <CarritoCompras />
                </div>
              }
            />
            <Route
              path="/confirmacion"
              element={
                <div className="bg-white rounded-lg shadow-md p-6">
                  <ConfirmacionDatosPage />
                </div>
              }
            />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white py-4 text-center">
          <p>&copy; 2024 Tu Tienda. Todos los derechos reservados.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
