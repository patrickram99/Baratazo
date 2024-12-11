import React, { useEffect, useRef } from 'react'
import { Check, Package, Truck, Box, Download, Mail } from 'lucide-react'
import { useLocation, Navigate } from 'react-router-dom'
import html2canvas from 'html2canvas'
import emailjs from 'emailjs-com'

interface Product {
  productId: string
  name: string
  price: number
  imageUrl: string
  cantidad: number
  status: 'confirmado' | 'en_proceso' | 'enviado' | 'entregado'
}

interface OrderState {
  orderData: {
    orderNumber: string
    orderDate: string
    estimatedDelivery: string
    totalAmount: number
    statusDates: StatusDates
    products: Product[]
  }
}

interface StatusDates {
  confirmado: string
  en_proceso: string
  enviado: string
  entregado: string
}

interface StatusIconProps {
  status: keyof StatusDates
  isCompleted: boolean
}

interface OrderStatusTimelineProps {
  statusDates: StatusDates
}

interface Step {
  label: string
  isCompleted: boolean
}

interface OrderProgressProps {
  steps: Step[]
}

const LOCAL_STORAGE_KEY = 'orderTrackingData'

const saveOrderToLocalStorage = (orderNumber: string, orderData: OrderState['orderData']) => {
  try {
    const existingData = localStorage.getItem(LOCAL_STORAGE_KEY)
    const orders = existingData ? JSON.parse(existingData) : {}
    orders[orderNumber] = orderData
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

const getOrderFromLocalStorage = (orderNumber: string) => {
  try {
    const existingData = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!existingData) return null
    const orders = JSON.parse(existingData)
    return orders[orderNumber] || null
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return null
  }
}

const StatusIcon: React.FC<StatusIconProps> = ({ status, isCompleted }) => {
  const iconProps = {
    className: `w-6 h-6 ${isCompleted ? 'text-[#1A6DAF]' : 'text-gray-400'}`,
  }

  switch (status) {
    case 'confirmado':
      return <Check {...iconProps} />
    case 'en_proceso':
      return <Package {...iconProps} />
    case 'enviado':
      return <Truck {...iconProps} />
    case 'entregado':
      return <Box {...iconProps} />
    default:
      return <Check {...iconProps} />
  }
}

const OrderStatusTimeline: React.FC<OrderStatusTimelineProps> = ({ statusDates }) => {
  const statuses = Object.entries(statusDates)
  const lastCompletedIndex = statuses.reduce((lastIndex, [date], index) => {
    return date ? index : lastIndex
  }, -1)

  return (
    <div className="mb-8 grid grid-cols-4 gap-4">
      {statuses.map(([status, date], index) => {
        const isCompleted = index <= lastCompletedIndex

        return (
          <div key={status} className="relative text-center">
            {index < statuses.length - 1 && (
              <div
                className={`absolute right-0 top-4 h-0.5 w-full transform ${
                  isCompleted ? 'bg-[#1A6DAF]' : 'bg-gray-300'
                }`}
                style={{ width: 'calc(100% - 1rem)', left: '50%' }}
              />
            )}
            <div className="relative flex flex-col items-center">
              <div
                className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  isCompleted ? 'border-[#1A6DAF] bg-white' : 'border-gray-300 bg-white'
                }`}
              >
                <StatusIcon status={status as keyof StatusDates} isCompleted={isCompleted} />
              </div>
              <div className="text-sm font-medium text-gray-900">
                {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
              </div>
              {date && <div className="mt-1 text-xs text-gray-500">{date}</div>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

const OrderProgress: React.FC<OrderProgressProps> = ({ steps }) => {
  return (
    <div className="w-full max-w-xs">
      <div className="relative flex items-center justify-between">
        {steps.map((step, index: number) => (
          <React.Fragment key={step.label}>
            {index > 0 && (
              <div
                className="absolute h-0.5 bg-[#1A6DAF]"
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
                  step.isCompleted ? 'bg-[#1A6DAF]' : 'border-[#1A6DAF]'
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

const SeguimientoPedido: React.FC = () => {
  const location = useLocation()
  const state = location.state as OrderState
  const orderDataFromState = state?.orderData
  const componentRef = useRef<HTMLDivElement>(null)

  // Check localStorage for existing order data
  const orderDataFromStorage = orderDataFromState?.orderNumber
    ? getOrderFromLocalStorage(orderDataFromState.orderNumber)
    : null

  // Use data from state or fallback to stored data
  const orderData = orderDataFromState || orderDataFromStorage

  // Save order data to localStorage when it changes
  useEffect(() => {
    if (orderData?.orderNumber) {
      saveOrderToLocalStorage(orderData.orderNumber, orderData)
    }
  }, [orderData])

  if (!orderData) {
    return <Navigate to="/" />
  }

  const steps: Step[] = [
    { label: 'Carrito', isCompleted: true },
    { label: 'Confirmación', isCompleted: true },
    { label: 'Entrega', isCompleted: true },
  ]

  const handleDownloadImage = () => {
    if (componentRef.current) {
      html2canvas(componentRef.current).then((canvas) => {
        const link = document.createElement('a')
        link.download = `pedido-${orderData.orderNumber}.png`
        link.href = canvas.toDataURL()
        link.click()
      })
    }
  }

  const handleSendEmail = () => {
    const templateParams = {
      to_email: 'correo@ejemplo.com', // Reemplaza con el correo del destinatario
      order_number: orderData.orderNumber,
      order_date: orderData.orderDate,
      estimated_delivery: orderData.estimatedDelivery,
      total_amount: orderData.totalAmount.toFixed(2),
    }

    emailjs.send(
      'YOUR_SERVICE_ID', // Reemplaza con tu Service ID de EmailJS
      'YOUR_TEMPLATE_ID', // Reemplaza con tu Template ID de EmailJS
      templateParams,
      'YOUR_USER_ID' // Reemplaza con tu User ID de EmailJS
    )
    .then((response) => {
      console.log('Email sent successfully:', response.status, response.text)
      alert('Email enviado correctamente')
    })
    .catch((error) => {
      console.error('Error sending email:', error)
      alert('Error al enviar el email')
    })
  }

  return (
    <div className="min-h-screen bg-white p-5">
      <div className="mx-auto max-w-6xl" ref={componentRef}>
        <nav className="text-black-500 mb-3 flex items-center text-sm">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>Mis pedidos</span>
          <span className="mx-2">/</span>
          <span>ID Pedido: {orderData.orderNumber}</span>
        </nav>

        <div className="mb-0">
          <h1 className="text-2xl font-bold">Pedidos</h1>
        </div>

        <div className="flex gap-2">
          <div className="flex-1 space-y-2">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-6">
                <p className="mb-2">ID Pedido: {orderData.orderNumber}</p>
                <div className="flex justify-between text-sm font-bold text-[#1A6DAF]">
                  <p>Fecha estimada: {orderData.orderDate}</p>
                  <p>Entrega estimada: {orderData.estimatedDelivery}</p>
                </div>
              </div>

              <OrderStatusTimeline statusDates={orderData.statusDates} />

              {orderData.products.map(product => (
                <div key={product.productId} className="mb-4 flex items-start gap-4 border-t pt-4">
                  <div className="h-24 w-24 flex-shrink-0 bg-gray-200">
                    <img
                      src={product.imageUrl || '/api/placeholder/96/96'}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="mt-1">Cant: {product.cantidad}</p>
                    <p className="mt-1">S/ {product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-96">
            <div className="mb-6">
              <OrderProgress steps={steps} />
            </div>
            <div className="mb-6 rounded bg-[#F5F7FF] p-6 shadow-md">
              <h2 className="mb-6 text-lg font-semibold">Total de pedidos</h2>
              <div className="mt-6 border-t pt-4">
                {orderData.products.map(product => (
                  <div key={product.productId} className="mb-4 flex items-start gap-4">
                    <div className="h-16 w-16 flex-shrink-0 bg-gray-200">
                      <img
                        src={product.imageUrl || '/api/placeholder/64/64'}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">ID Producto: {product.productId}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between">
                  <span className="font-medium">Total del pedido</span>
                  <span className="font-medium">S/ {orderData.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={handleDownloadImage}
          className="flex items-center rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          <Download className="mr-2 h-5 w-5" />
          Descargar como PNG
        </button>
        {/* <button
          onClick={handleSendEmail}
          className="flex items-center rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          <Mail className="mr-2 h-5 w-5" />
          Enviar por correo
        </button> */}
      </div>
    </div>
  )
}

export default SeguimientoPedido