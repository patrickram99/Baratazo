import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

interface Producto {
  imagen: string
  nombre: string
  descripcion: string
  precio: string
  cantidad?: number
}

const OrderProgress: React.FC<{ steps: { label: string; isCompleted: boolean }[] }> = ({
  steps,
}) => {
  return (
    <div className="w-full max-w-xs">
      <div className="relative flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.label}>
            {index > 0 && (
              <div
                className="absolute h-0.5 flex-grow bg-gray-300"
                style={{
                  left: `calc(${(index - 1) * (100 / (steps.length - 1))}% + 20px)`,
                  right: `calc(${100 - index * (100 / (steps.length - 1))}% + 20px)`,
                  top: '14px',
                }}
              />
            )}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                  step.isCompleted ? 'bg-[#1A6DAF]' : 'border-gray-300 bg-white'
                }`}
              >
                {step.isCompleted ? (
                  <span className="text-sm text-white">✓</span>
                ) : (
                  <span className="text-sm text-gray-500">{index + 1}</span>
                )}
              </div>
              <span className="mt-2 text-center text-xs text-black">{step.label}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

const CarritoCompras: React.FC = () => {
  const navigate = useNavigate()
  const [productos, setProductos] = useState<Producto[]>([])
  const [totalCarrito, setTotalCarrito] = useState<number>(0)
  const [tarifaEnvio] = useState<number>(15.0)
  const [opcionEnvio, setOpcionEnvio] = useState<string>('tarifa')
  const [mostrarEnvio, setMostrarEnvio] = useState<boolean>(false)

  const calcularTotal = useCallback((carrito: Producto[]) => {
    const total = carrito.reduce((acc, producto) => {
      const precio = parseFloat(producto.precio.replace('S/ ', '').replace(',', '.'))
      const precioTotal = precio * (producto.cantidad || 1)
      return acc + precioTotal
    }, 0)

    setTotalCarrito(total)
  }, [])

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito') || '[]') as Producto[]
    setProductos(carritoGuardado)
    calcularTotal(carritoGuardado)
  }, [calcularTotal])

  useEffect(() => {
    calcularTotal(productos)
  }, [productos, calcularTotal])

  const actualizarCantidad = (index: number, nuevaCantidad: string) => {
    const carrito = [...productos]
    carrito[index].cantidad = parseInt(nuevaCantidad)
    setProductos(carrito)
    localStorage.setItem('carrito', JSON.stringify(carrito))
    calcularTotal(carrito)
  }

  const eliminarProducto = (index: number) => {
    const carrito = productos.filter((_, i) => i !== index)
    setProductos(carrito)
    localStorage.setItem('carrito', JSON.stringify(carrito))
    calcularTotal(carrito)
  }

  const continuarComprando = () => {
    navigate('/')
  }

  const borrarCarrito = () => {
    setProductos([])
    localStorage.removeItem('carrito')
    setTotalCarrito(0)
  }

  const comprar = () => {
    if (productos.length === 0) return

    const productosConCantidades = productos.map(producto => ({
      ...producto,
      cantidad: producto.cantidad || 1,
    }))

    const totalFinal = totalCarrito + tarifaEnvio

    navigate('/confirmacion', {
      state: {
        productos: productosConCantidades,
        opcionEnvio,
        totalFinal: totalFinal,
      },
    })
  }

  const orderSteps = [
    { label: 'Carrito', isCompleted: true },
    { label: 'Confirmación de Pago', isCompleted: false },
    { label: 'Entrega', isCompleted: false },
  ]

  return (
    <div className="font-sans min-h-screen bg-[#FFFFFF]">
      <main className="container mx-auto mt-[-20px] px-4 py-4">
        <nav className="mb-4">
          <span className="text-gray-900">Home </span>
          <span className="text-[#1A6DAF]">&gt; </span>
          <span className="text-gray-900">Carrito</span>
        </nav>

        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Carrito de la compra</h1>
          <OrderProgress steps={orderSteps} />
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="lg:w-2/3">
            <table className="w-full overflow-hidden rounded-lg bg-white shadow-md">
              <thead className="bg-[#FFFFFF]">
                <tr>
                  <th className="px-2 py-3 text-left">Imagen</th>
                  <th className="px-2 py-3 text-left"></th>
                  <th className="px-2 py-3 text-left">Precio</th>
                  <th className="px-2 py-3 text-left">Cantidad</th>
                  <th className="px-2 py-3 text-left">Total</th>
                  <th className="px-2 py-3 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {productos.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-4 text-center">
                      Tu carrito está vacío.
                    </td>
                  </tr>
                ) : (
                  productos.map((producto, index) => {
                    const precio = parseFloat(producto.precio.replace('S/ ', '').replace(',', '.'))
                    const precioTotal = precio * (producto.cantidad || 1)
                    return (
                      <tr key={index} className="border-b">
                        <td className="px-2 py-4">
                          <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="h-16 w-16 object-cover"
                          />
                        </td>
                        <td className="px-2 py-4">
                          <h3 className="font-semibold">{producto.nombre}</h3>
                          <p>{producto.descripcion}</p>
                        </td>
                        <td className="px-2 py-4">{producto.precio}</td>
                        <td className="px-2 py-4">
                          <input
                            type="number"
                            value={producto.cantidad}
                            onChange={e => actualizarCantidad(index, e.target.value)}
                            min="1"
                            className="w-16 rounded border px-2"
                          />
                        </td>
                        <td className="px-2 py-4">{`S/ ${precioTotal.toFixed(2)}`}</td>
                        <td className="px-2 py-4">
                          <button
                            onClick={() => eliminarProducto(index)}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFFFFF] text-white hover:bg-[#FFFFFF]"
                          >
                            <img
                              src="/src/Icons/BotonEliminar.png"
                              alt="Eliminar"
                              className="h-4 w-4"
                            />
                          </button>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
            <div className="mt-4 flex justify-between">
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
            </div>
          </div>

          <div
            className="lg:w-1/3"
            style={{ backgroundColor: '#F5F7FF', padding: '16px', borderRadius: '8px' }}
          >
            <h2 className="-b[00BFFF] mb-6 text-xl font-semibold">Resumen</h2>
            <div className="mb-4">
              <p
                className="flex cursor-pointer items-center justify-between font-medium"
                onClick={() => setMostrarEnvio(!mostrarEnvio)}
              >
                Estimar envío
                <span className="text-xs text-gray-500">▼</span>
              </p>
              <p className="text-sm text-gray-500">
                Ingrese su destino para obtener una estimación de envío.
              </p>

              {mostrarEnvio && (
                <div className="mt-4">
                  <label className="mb-2 block font-medium">País</label>
                  <select className="w-full rounded border p-2">
                    <option>Zimbabue</option>
                    <option>Perú</option>
                    <option>Argentina</option>
                  </select>
                  <label className="mb-2 mt-4 block font-medium">Estado / Provincia</label>
                  <input
                    type="text"
                    className="w-full rounded border p-2"
                    placeholder="Ingrese su estado/provincia"
                  />
                  <label className="mb-2 mt-4 block font-medium">Código postal</label>
                  <input
                    type="text"
                    className="w-full rounded border p-2"
                    placeholder="Ingrese código postal"
                  />
                  <div className="mt-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="envio"
                        value="tarifa"
                        checked={opcionEnvio === 'tarifa'}
                        onChange={() => setOpcionEnvio('tarifa')}
                        className="mr-2"
                      />
                      Tarifa estándar
                    </label>
                    <p className="ml-6 text-sm text-gray-500">
                      El precio puede variar dependiendo del artículo/destino. El personal de la
                      tienda se comunicará con usted. S/ 15.00
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <p className="flex justify-between">
                <span className="font-semibold">Subtotal</span>
                <span>{`S/ ${totalCarrito.toFixed(2)}`}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Envío</span>
                <span>
                  {opcionEnvio === 'recoger' ? 'S/ 0.00' : `S/ ${tarifaEnvio.toFixed(2)}`}
                </span>
              </p>
              <p className="mt-4 flex justify-between border-t pt-4 text-lg font-semibold">
                <span>Total</span>
                <span>{`S/ ${(totalCarrito + tarifaEnvio).toFixed(2)}`}</span>
              </p>
            </div>

            <button
              onClick={comprar}
              disabled={productos.length === 0}
              className={`mt-6 w-full rounded-full px-6 py-2 text-white transition duration-300 ${
                productos.length === 0
                  ? 'cursor-not-allowed bg-gray-400'
                  : 'bg-[#1A6DAF] hover:bg-blue-600'
              }`}
            >
              Realizar compra
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CarritoCompras
