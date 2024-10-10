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
    setTotalCarrito(0)
  }

  const comprar = () => {
    navigate('/confirmacion')
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-3xl font-bold">Carrito de la compra</h1>
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="lg:w-3/4">
            <table className="w-full overflow-hidden rounded-lg bg-white shadow-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left">Imagen</th>
                  <th className="px-4 py-3 text-left">Artículo</th>
                  <th className="px-4 py-3 text-left">Descripción</th>
                  <th className="px-4 py-3 text-left">Precio</th>
                  <th className="px-4 py-3 text-left">Cantidad</th>
                  <th className="px-4 py-3 text-left">Total</th>
                  <th className="px-4 py-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-4 text-center">
                      Tu carrito está vacío.
                    </td>
                  </tr>
                ) : (
                  productos.map((producto, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-4">
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="h-20 w-20 object-cover"
                        />
                      </td>
                      <td className="px-4 py-4">{producto.nombre}</td>
                      <td className="px-4 py-4">{producto.descripcion}</td>
                      <td className="px-4 py-4">{producto.precio}</td>
                      <td className="px-4 py-4">
                        <input
                          type="number"
                          value={producto.cantidad || 1}
                          min="1"
                          className="w-20 rounded border p-2"
                          onChange={e => actualizarCantidad(index, e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-4">
                        S/{' '}
                        {(
                          parseFloat(producto.precio.replace('S/ ', '')) * (producto.cantidad || 1)
                        ).toFixed(2)}
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => eliminarProducto(index)}
                          className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <aside className="rounded-lg bg-white p-6 shadow-md lg:w-1/4">
            <h2 className="mb-4 text-xl font-semibold">Resumen</h2>
            <p className="mb-4">Estimar envío e impuestos</p>
            <div className="mb-4">
              <label htmlFor="pais" className="mb-2 block">
                País
              </label>
              <select id="pais" className="w-full rounded border p-2">
                <option value="Zimbabue">Zimbabue</option>
                {/* Otros países */}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="provincia" className="mb-2 block">
                Estado/Provincia
              </label>
              <input type="text" id="provincia" className="w-full rounded border p-2" />
            </div>
            <div className="mb-4">
              <label htmlFor="codigo-postal" className="mb-2 block">
                Código Postal
              </label>
              <input type="text" id="codigo-postal" className="w-full rounded border p-2" />
            </div>
            <div className="mb-4 flex items-center">
              <input type="checkbox" id="recoger-tienda" defaultChecked className="mr-2" />
              <label htmlFor="recoger-tienda">Recoger en tienda: 529 C. Juan Manuel Polar</label>
            </div>
            <h3 className="mb-4 text-xl font-semibold">
              Total: <span id="total">S/ {totalCarrito.toFixed(2)}</span>
            </h3>
            <button
              onClick={comprar}
              className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
            >
              Comprar
            </button>
          </aside>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={continuarComprando}
            className="rounded bg-blue-500 px-6 py-2 text-white transition duration-300 hover:bg-blue-600"
          >
            Continuar comprando
          </button>
          <button
            onClick={borrarCarrito}
            className="rounded bg-gray-500 px-6 py-2 text-white transition duration-300 hover:bg-gray-600"
          >
            Borrar carrito
          </button>
        </div>
      </main>
    </div>
  )
}

export default CarritoCompras
