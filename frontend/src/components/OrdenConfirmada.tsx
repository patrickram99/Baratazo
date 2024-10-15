import React from 'react'
import { useLocation } from 'react-router-dom'

interface Producto {
  imagen: string
  nombre: string
  precio: string
  cantidad: number
}

interface OrderResponse {
  order: {
    orderNumber: string
    createdAt: string
    estimatedDeliveryDate: string
  }
  shippingAddress: {
    name: string
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    country: string
    postalCode: string
    phoneNumber: string
  }
}

interface LocationState {
  orderResponse: OrderResponse
  productos: Producto[]
}

const OrdenConfirmada: React.FC = () => {
  const location = useLocation()
  const { orderResponse, productos } = location.state as LocationState

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-green-600">Pago confirmado! ✓</h1>
          <p className="text-gray-600">Código de pedido: {orderResponse.order.orderNumber}</p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">Enviar a:</h2>
            <p className="font-medium">{orderResponse.shippingAddress.name}</p>
            <p>{orderResponse.shippingAddress.addressLine1}</p>
            {orderResponse.shippingAddress.addressLine2 && (
              <p>{orderResponse.shippingAddress.addressLine2}</p>
            )}
            <p>
              {orderResponse.shippingAddress.city}, {orderResponse.shippingAddress.state}
            </p>
            <p>
              {orderResponse.shippingAddress.country} {orderResponse.shippingAddress.postalCode}
            </p>
            <p className="mt-2">Teléfono: {orderResponse.shippingAddress.phoneNumber}</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">Detalles del pedido</h2>
            <p>Fecha de pedido: {formatDate(orderResponse.order.createdAt)}</p>
            <p>Estimado de envío: {formatDate(orderResponse.order.estimatedDeliveryDate)}</p>
          </div>
        </div>

        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Boleta de pedido</h2>
          <p className="mb-4">{productos.length} artículo(s) en tu carrito</p>
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
        </div>

        <div className="flex justify-between">
          <button className="rounded-full bg-blue-600 px-6 py-2 font-bold text-white transition-colors hover:bg-blue-700">
            Ver seguimiento
          </button>
          <button className="rounded-full bg-yellow-400 px-6 py-2 font-bold text-white transition-colors hover:bg-yellow-500">
            Imprimir comprobante
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrdenConfirmada
