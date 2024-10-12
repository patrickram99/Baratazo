import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Producto {
  imagen: string
  nombre: string
  descripcion: string
  precio: string
  cantidad?: number
}

const CarritoCompras: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([
    {
      imagen: '/img/gabinete1.jpg',
      nombre: 'Gabinete Gaming',
      descripcion: 'Case con iluminación RGB.',
      precio: 'S/ 99.00',
      cantidad: 1,
    },
    {
      imagen: '/img/auriculares1.jpg',
      nombre: 'Auriculares Gaming',
      descripcion: 'Auriculares con micrófono.',
      precio: 'S/ 89.90',
      cantidad: 1,
    },
  ])
  const [totalCarrito, setTotalCarrito] = useState<number>(0)
  const navigate = useNavigate()

  useEffect(() => {
    calcularTotal(productos)
  }, [productos])

  const calcularTotal = (carrito: Producto[]) => {
    const total = carrito.reduce((acc, producto) => {
      const precio = parseFloat(producto.precio.replace('S/ ', ''))
      return acc + precio * (producto.cantidad || 1)
    }, 0)
    setTotalCarrito(total)
  }

  const actualizarCantidad = (index: number, nuevaCantidad: string) => {
    const carrito = [...productos]
    carrito[index].cantidad = parseInt(nuevaCantidad)
    setProductos(carrito)
    calcularTotal(carrito)
  }

  const eliminarProducto = (index: number) => {
    const carrito = productos.filter((_, i) => i !== index)
    setProductos(carrito)
    calcularTotal(carrito)
  }

  const continuarComprando = () => {
    navigate('/')
  }

  const borrarCarrito = () => {
    setProductos([])
    calcularTotal([])
  }

  const comprar = () => {
    navigate('/confirmacion')
  }

  const totalPedido = totalCarrito // Ajusta este cálculo según tus necesidades

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-1">
          <h2 className="text-xs">Home &gt; Carrito</h2>
        </div>
        <h1 className="mb-8 text-left text-3xl font-bold">Carrito de la compra</h1>
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="lg:w-3/4">
            <table className="w-full overflow-hidden rounded-lg bg-white shadow-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left">Imagen</th>
                  <th className="px-4 py-3 text-left">Descripción</th>
                  <th className="px-4 py-3 text-left">Precio</th>
                  <th className="px-4 py-3 text-left">Cantidad</th>
                  <th className="px-4 py-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center">
                      Tu carrito está vacío.
                    </td>
                  </tr>
                ) : (
                  productos.map((producto, index) => {
                    return (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-4">
                          <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="h-16 w-16 object-cover"
                          />
                        </td>
                        <td className="px-4 py-4">
                          <h3 className="font-semibold">{producto.nombre}</h3>
                          <p>{producto.descripcion}</p>
                        </td>
                        <td className="px-4 py-4">{producto.precio}</td>
                        <td className="px-4 py-4">
                          <input
                            type="number"
                            value={producto.cantidad}
                            onChange={e => actualizarCantidad(index, e.target.value)}
                            min="1"
                            className="w-16 rounded border px-2"
                          />
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => eliminarProducto(index)}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
            <div className="mt-4 flex justify-start">
              <div className="flex gap-2">
                <button
                  onClick={continuarComprando}
                  className="mb-2 rounded-full border border-[#FDCD11] bg-transparent px-6 py-2 font-semibold text-black transition duration-300 hover:bg-gray-100"
                >
                  Continuar comprando
                </button>
                <button
                  onClick={borrarCarrito}
                  className="mb-2 rounded-full bg-[#1A6DAF] px-6 py-2 text-white transition duration-300 hover:bg-blue-600"
                >
                  Borrar carrito
                </button>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => calcularTotal(productos)}
                  className="rounded-full bg-[#4D4D4D] px-6 py-2 text-black" // Color de fondo constante
                >
                  Actualizar carrito
                </button>
              </div>
            </div>
          </div>

          <aside className="rounded-lg bg-[#bceeff] p-6 shadow-md lg:w-1/4">
            <h2 className="mb-4 text-xl font-semibold">Resumen</h2>
            <div className="mb-4">
              <h3 className="mb-2">Total en productos:</h3>
              <p>S/ {totalCarrito.toFixed(2)}</p>
            </div>
            <div className="mb-4">
              <h3 className="mb-2">Total del pedido:</h3>
              <p>S/ {totalPedido.toFixed(2)}</p>
            </div>
            <button
              onClick={comprar}
              className="rounded-full bg-[#1A6DAF] px-6 py-2 text-white transition duration-300 hover:bg-blue-600"
            >
              Comprar
            </button>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default CarritoCompras
