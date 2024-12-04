import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

interface Producto {
  nombre: string
  descripcion: string
  precio: string
  imagen: string
  cantidad?: number
}

const DatosProducto: React.FC = () => {
  const location = useLocation()
  const producto = location.state as Producto
  const { nombre } = useParams()
  const navigate = useNavigate()
  const [cantidad, setCantidad] = useState(1)

  if (!producto) {
    return (
      <div className="container mx-auto my-8 px-4">
        <p>No se encontraron detalles para el producto {nombre}</p>
      </div>
    )
  }

  const handleAgregarCarrito = () => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito') || '[]')
    const nuevoCarrito = [...carritoActual, { ...producto, cantidad }]
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito))
    navigate('/carrito')
  }

  const handleCantidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevaCantidad = parseInt(e.target.value, 10)
    if (nuevaCantidad > 0) {
      setCantidad(nuevaCantidad)
    }
  }

  return (
    <div className="container mx-auto my-8 px-4">
      {/* Encabezado con botones */}
      <div className="flex items-center justify-between border-b border-gray-300 pb-4">
        <h2 className="text-2xl font-bold">Datos del producto</h2>
        <div className="flex space-x-4">
          <button
            onClick={handleAgregarCarrito}
            className="mb-2 rounded-full bg-[#1A6DAF] px-6 py-2 text-white transition duration-300 hover:bg-blue-600"
          >
            Añadir al carrito
          </button>
          <button className="mb-2 rounded-full bg-[#FDCD11] px-6 py-2 text-white transition duration-300 hover:bg-blue-600">
            Añadir a la lista
          </button>
        </div>
      </div>

      {/* Contenido del producto */}
      <div className="mt-8 flex flex-col items-start md:flex-row">
        {/* Información del producto */}
        <div className="mb-4 md:mb-0 md:w-1/2">
          <h3 className="mb-4 text-3xl font-bold">{producto.nombre}</h3>
          <p className="mb-4 text-gray-700">{producto.descripcion}</p>
          <div className="flex items-center space-x-4">
            <p className="text-lg font-semibold">Precio del producto:</p>
          </div>
          <p className="mb-4 text-2xl font-bold text-black">{producto.precio}</p>
          <div className="mt-4 flex items-center space-x-4">
            <label className="text-lg font-semibold">Cantidad:</label>
            <input
              type="number"
              min="1"
              value={cantidad}
              onChange={handleCantidadChange}
              className="w-16 rounded-lg border px-2 py-1 text-center"
            />
          </div>
        </div>

        {/* Imagen del producto */}
        <div className="flex justify-center md:w-1/2">
          <img src={producto.imagen} alt={producto.nombre} className="w-3/4 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export default DatosProducto
