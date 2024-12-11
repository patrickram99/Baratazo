import React from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'

interface Producto {
  imagen: string
  nombre: string
  precio: string
  cantidad: number
}

interface FormData {
  email: string
  nombre: string
  apellido: string
  telefono: string
  pais: string
  estado: string
  direccion: string
  direccion2: string
  ciudad: string
  codigoPostal: string
}

interface LocationState {
  orderResponse: {
    order: {
      orderNumber: string
      createdAt: string
      estimatedDeliveryDate: string
    }
    shippingAddress: {
      addressLine1: string
      addressLine2: string
      description: string
    }
  }
  productos: Producto[]
  formData: FormData
  totalFinal: number
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
                className="absolute h-0.5 bg-gray-300"
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

const OrdenConfirmada: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as LocationState

  if (!state || !state.orderResponse || !state.productos || !state.formData) {
    console.error('Datos incompletos en el estado:', state)
    return <Navigate to="/" replace />
  }

  const { orderResponse, productos, formData, totalFinal } = state

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const orderSteps = [
    { label: 'Carrito', isCompleted: true },
    { label: 'Confirmación', isCompleted: true },
    { label: 'Entrega', isCompleted: false },
  ]
  const handlevolver = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-1">
          <span className="text-[#4D4D4D]">Home </span>
          <span className="text-[#1A6DAF]">&gt; </span>
          <span className="text-[#4D4D4D]">Carrito</span>
          <span className="text-[#1A6DAF]">&gt; </span>
          <span className="text-[#4D4D4D]">Confirmación</span>
          <span className="text-[#1A6DAF]">&gt; </span>
          <span className="text-[#4D4D4D]">Método de pago</span>
        </nav>

        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">Pago confirmado! ✓</h1>
            <p className="font-bold text-black">
              Código de pedido: {orderResponse.order.orderNumber}
            </p>
            <p className="text-black-600 font-bold">
              Fecha de compra: {formatDate(orderResponse.order.createdAt)} •{' '}
              <span className="text-blue-600">
                Estimación de envío: {formatDate(orderResponse.order.estimatedDeliveryDate)}
              </span>
            </p>
            <h2 className="mb-2 text-xl font-bold">Enviar a:</h2>
          </div>
          <div className="w-1/3">
            <div className="mb-8 flex justify-end">
              <OrderProgress steps={orderSteps} />
            </div>
          </div>
        </div>

        <div className="justify-left mb-1 flex gap-12">
          <div className="w-2/3">
            <div className="mb-9 border border-black bg-white p-3 shadow-sm">
              <p className="font-medium">
                Nombre: {formData.nombre} {formData.apellido}
              </p>
              <p className="font-medium">Dirección: {orderResponse.shippingAddress.addressLine1}</p>
              <p>{orderResponse.shippingAddress.addressLine2}</p>
              <p className="font-medium">Teléfono: {formData.telefono}</p>
            </div>
            <div className="flex gap-4">
              <button className="rounded-full bg-[#1A6DAF] px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700">
                Ver seguimiento
              </button>
              <button
                onClick={handlevolver}
                className="rounded-full bg-yellow-400 px-6 py-2 font-medium text-white transition-colors hover:bg-yellow-500"
              >
                Seguir comprando
              </button>
            </div>
          </div>

          <div className="w-0.5/3">
            <div className="rounded bg-[#F5F7FF] p-6 shadow-md">
              <h2 className="mb-4 text-xl font-bold">Boleta de pedido</h2>
              <p className="mb-4">{productos.length} artículo(s) en tu camino</p>
              {productos.map((producto, index) => (
                <div key={index} className="mb-4 flex items-center">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="mr-4 h-16 w-16 object-cover"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{producto.nombre}</h3>
                    <p className="text-sm text-gray-600">Cantidad: {producto.cantidad}</p>
                  </div>
                  <p className="font-medium">
                    S/. {parseFloat(producto.precio.replace('S/ ', '')).toFixed(2)}
                  </p>
                </div>
              ))}
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

export default OrdenConfirmada
