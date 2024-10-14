import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

interface Producto {
  imagen: string
  nombre: string
  descripcion: string
  precio: string
  cantidad?: number
}

interface LocationState {
  productos: Producto[]
  totalFinal: number
  formData: {
    email: string
    nombre: string
    apellido: string
    telefono: string
    pais: string
    estado: string
    direccion: string
    ciudad: string
    codigoPostal: string
    referencia: string
  }
  paymentMethod: string
  orderSteps: { label: string; isCompleted: boolean }[]
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

const PagoEfectivo: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as LocationState

  useEffect(() => {
    if (!state) {
      console.error('No state found in location')
      navigate('/confirmacion', { replace: true })
    } else {
      // Mostrar la información de pago en la consola
      console.log('Información de pago:', state)
    }
  }, [state, navigate])

  const procesarPago = async () => {
    const { formData, productos, totalFinal } = state

    const orderData = {
      email: formData.email,
      phoneNumber: formData.telefono,
      totalAmount: totalFinal,

      shippingAddress: {
        country: formData.pais,
        addressLine1: formData.direccion,
        addressLine2: formData.referencia || '',
        state: formData.estado,
        city: formData.ciudad,
        postalCode: formData.codigoPostal,
        description: formData.referencia,
      },
      items: productos.map((producto, index) => ({
        productId: index + 1,
        quantity: producto.cantidad || 1,
        price: parseFloat(producto.precio.replace('S/ ', '')),
      })),
    }

    console.log('Datos de la orden:', orderData)

    try {
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error('Error al procesar el pago')
      }

      const data = await response.json()

      navigate('/order-confirmation', {
        state: {
          orderResponse: data,
          productos,
          totalFinal,
        },
      })

      // Limpieza de campos, si es necesario
    } catch (error) {
      console.error('Error en la solicitud:', error)
      alert('Hubo un problema al procesar su pago. Inténtelo nuevamente.')
    }
  }

  const volverAConfirmacion = () => {
    navigate('/confirmacion', { state: state })
  }

  if (!state) {
    return <div>Redirigiendo...</div>
  }

  const { productos, totalFinal, orderSteps } = state

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <nav className="mb-2">
          <span className="text-gray-900">Home </span>
          <span className="text-[#1A6DAF]">&gt; </span>
          <span className="text-gray-900">Carrito</span>
          <span className="text-[#1A6DAF]">&gt; </span>
          <span className="text-gray-900">Confirmación</span>
          <span className="text-[#1A6DAF]">&gt; </span>
          <span className="text-gray-900">Método de pago</span>
        </nav>

        <div className="mb-4 flex items-start justify-between">
          <div>
            <h1 className="mb-1 text-3xl font-bold">Agregar Método de pago</h1>
            <h2 className="text-base font-semibold">Pago efectivo</h2>
          </div>
          <OrderProgress steps={orderSteps} />
        </div>

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-2/3">
            <div className="mt-8">
              <img
                src="/img/pagoefectivo.png"
                alt="Pago Efectivo"
                className="h-auto w-full max-w-3xl rounded shadow-md"
              />
              <div className="mt-4">
                <button
                  onClick={volverAConfirmacion}
                  className="rounded-full border border-[#FDCD11] bg-transparent px-6 py-2 font-semibold text-black transition duration-300 hover:bg-gray-100"
                >
                  Regresar
                </button>
                <button
                  onClick={procesarPago}
                  className="ml-4 rounded-full border border-[#1A6DAF] bg-[#1A6DAF] px-6 py-2 font-semibold text-white transition duration-300 hover:bg-[#1A6DAF]"
                >
                  Confirmar Pago
                </button>
              </div>
            </div>
          </div>

          <div className="w-full px-4 lg:w-1/3">
            <div className="rounded bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-bold">Resumen del pedido</h2>
              <ul className="mb-4">
                {productos.map((producto, index) => (
                  <li key={index} className="mb-4 flex items-start justify-between">
                    <div className="flex items-start">
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="mr-4 h-16 w-16 object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{producto.nombre}</h3>
                        <p className="text-sm text-gray-600">{producto.descripcion}</p>
                        <p className="mt-1">Cant: {producto.cantidad}</p>
                      </div>
                    </div>
                    <span className="font-medium">{producto.precio}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between border-t pt-4">
                <span className="font-bold">Total del pedido:</span>
                <span className="font-bold">S/. {totalFinal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PagoEfectivo
