import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainNavigation from './components/MainNavigation'
import Carousel from './components/Carousel'
import ProductosNuevos from './components/ProductosNuevos'
import CarritoCompras from './components/CarritoCompras'
import ConfirmacionDatos from './components/ConfirmacionDatos'
import AgregarMetodoPago from './components/AgregarMetodoPago'
import Footer from './components/Footer'
import './App.css'

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-[#FFFFFF]">
        {' '}
        {/* Cambié el color de fondo */}
        <MainNavigation />
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
                <div className="p-6">
                  {' '}
                  {/* Eliminé la clase bg-white */}
                  <CarritoCompras />
                </div>
              }
            />
            <Route
              path="/confirmacion"
              element={
                <div className="rounded-lg bg-white p-4">
                  <ConfirmacionDatos />
                </div>
              }
            />
            <Route
              path="/agregar-metodo-pago"
              element={
                <div className="rounded-lg bg-white p-4">
                  <AgregarMetodoPago />
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
