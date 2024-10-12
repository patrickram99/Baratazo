import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainNavigation from './components/MainNavigation'
import Carousel from './components/Carousel'
import ProductosNuevos from './components/ProductosNuevos'
import CarritoCompras from './components/CarritoCompras'
import ConfirmacionDatos from './components/ConfirmacionDatos'
import Footer from './components/Footer' // Importa el nuevo componente Footer
import './App.css' // Estilos globales para la app

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-gray-100">
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
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <CarritoCompras />
                </div>
              }
            />
            <Route
              path="/confirmacion"
              element={
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <ConfirmacionDatos />
                </div>
              }
            />
          </Routes>
        </main>
        {/* Inserta el nuevo Footer aquí */}
        <Footer />
      </div>
    </Router>
  )
}

export default App
