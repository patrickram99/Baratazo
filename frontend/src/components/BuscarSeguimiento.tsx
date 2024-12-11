import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

// Interfaces from SeguimientoPedido
interface Product {
  productId: string
  name: string
  price: number
  imageUrl: string
  cantidad: number
  status: 'confirmado' | 'en_proceso' | 'enviado' | 'entregado'
}

interface StatusDates {
  confirmado: string
  en_proceso: string
  enviado: string
  entregado: string
}

interface OrderData {
  orderNumber: string
  orderDate: string
  estimatedDelivery: string
  totalAmount: number
  statusDates: StatusDates
  products: Product[]
}

const LOCAL_STORAGE_KEY = 'orderTrackingData'

const BuscarSeguimiento: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState<string>('')
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  const getOrderFromLocalStorage = (orderNum: string): OrderData | null => {
    try {
      const existingData = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (!existingData) return null
      const orders: Record<string, OrderData> = JSON.parse(existingData)
      return orders[orderNum] || null
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return null
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setError('')

    if (!orderNumber.trim()) {
      setError('Por favor ingrese un número de orden')
      return
    }

    const orderData = getOrderFromLocalStorage(orderNumber)

    if (!orderData) {
      setError('No se encontró el pedido con ese número')
      return
    }

    // Navigate to SeguimientoPedido with the order data
    navigate('/seguimiento-pedido', {
      state: {
        orderData,
      },
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
            Seguimiento de Pedido
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">
                Número de Orden
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  id="orderNumber"
                  value={orderNumber}
                  onChange={e => setOrderNumber(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 p-4 pr-12 shadow-sm focus:border-[#1A6DAF] focus:outline-none focus:ring-1 focus:ring-[#1A6DAF]"
                  placeholder="Ingrese su número de orden"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-[#1A6DAF] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#145489] focus:outline-none focus:ring-2 focus:ring-[#1A6DAF] focus:ring-offset-2"
            >
              Buscar Pedido
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Ingrese el número de orden que recibió en su correo de confirmación
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuscarSeguimiento
