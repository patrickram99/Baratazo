import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Producto {
  nombre: string
  descripcion: string
  precio: string
  imagen: string
}

const productos: Producto[] = [
  {
    nombre: 'Laptop Gamer',
    descripcion: 'Potente laptop para gaming',
    precio: 'S/ 1299.99',
    imagen: '/img/laptop1.jpg',
  },
  {
    nombre: 'PC de Escritorio',
    descripcion: 'Computadora de alto rendimiento',
    precio: 'S/ 999.99',
    imagen: '/img/pc1.jpg',
  },
  {
    nombre: 'Monitor 4K',
    descripcion: 'Monitor de alta resolución',
    precio: 'S/ 499.99',
    imagen: '/img/monitor1.jpg',
  },
  {
    nombre: 'Teclado Mecánico',
    descripcion: 'Teclado para gamers',
    precio: 'S/ 129.99',
    imagen: '/img/teclado1.jpg',
  },
  {
    nombre: 'Mouse Óptico',
    descripcion: 'Mouse de alta precisión',
    precio: 'S/ 59.99',
    imagen: '/img/mouse1.jpg',
  },
  {
    nombre: 'Auriculares Gaming',
    descripcion: 'Auriculares con micrófono',
    precio: 'S/ 89.99',
    imagen: '/img/auriculares1.jpg',
  },
  {
    nombre: 'Tarjeta Gráfica',
    descripcion: 'GPU de última generación',
    precio: 'S/ 699.99',
    imagen: '/img/gpu1.jpg',
  },
  {
    nombre: 'SSD 1TB',
    descripcion: 'Disco de estado sólido',
    precio: 'S/ 149.99',
    imagen: '/img/ssd1.jpg',
  },
  {
    nombre: 'Fuente de Poder',
    descripcion: 'Fuente modular 750W',
    precio: 'S/ 129.99',
    imagen: '/img/fuente1.jpg',
  },
  {
    nombre: 'Gabinete Gaming',
    descripcion: 'Case con iluminación RGB',
    precio: 'S/ 99.99',
    imagen: '/img/gabinete1.jpg',
  },
  {
    nombre: 'Webcam HD',
    descripcion: 'Cámara para streaming',
    precio: 'S/ 79.99',
    imagen: '/img/webcam1.jpg',
  },
]

const ProductosNuevos: React.FC = () => {
  const navigate = useNavigate()

  const handleProductoClick = (producto: Producto) => {
    navigate(`/producto/${producto.nombre}`, { state: producto })
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {productos.map((producto, index) => (
        <div
          key={index}
          className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md"
          onClick={() => handleProductoClick(producto)}
        >
          <img src={producto.imagen} alt={producto.nombre} className="h-48 w-full object-cover" />
          <div className="p-4">
            <h3 className="mb-2 text-xl font-semibold">{producto.nombre}</h3>
            <p className="mb-4 text-sm text-gray-600">{producto.descripcion}</p>
            <span className="text-lg font-bold text-blue-600">{producto.precio}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
export default ProductosNuevos
