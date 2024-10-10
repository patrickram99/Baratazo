import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import ProductosNuevos from './components/ProductosNuevos'
import CarritoCompras from './components/CarritoCompras'
import ConfirmacionDatosPage from './components/ConfirmacionDatos'
import './App.css' // Estilos globales para la app

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-gray-100">
        <Header />
        <Navbar />
        <main className="container mx-auto flex-grow px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="space-y-8">
                  <section className="overflow-hidden rounded-lg bg-white shadow-md">
                    <Carousel />
                  </section>
                  <section className="rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-2xl font-bold">Productos Nuevos</h2>
                    <ProductosNuevos />
                  </section>
                </div>
              }
            />
            <Route
              path="/carrito"
              element={
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <CarritoCompras />
                </div>
              }
            />
            <Route
              path="/confirmacion"
              element={
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <ConfirmacionDatosPage />
                </div>
              }
            />
          </Routes>
        </main>
        <footer className="bg-gray-800 py-4 text-center text-white">
          <p>&copy; 2024 Tu Tienda. Todos los derechos reservados.</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
