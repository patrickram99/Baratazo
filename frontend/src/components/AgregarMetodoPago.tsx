import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface Producto {
  imagen: string
  nombre: string
  descripcion: string
  precio: string
  cantidad?: number
}

interface OrderStep {
  label: string
  isCompleted: boolean
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

const AgregarMetodoPago: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { productos, totalFinal, formData, paymentMethod } = location.state as {
    productos: Producto[]
    totalFinal: number
    orderSteps: OrderStep[]
    formData: {
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
      referencia: string
    }
    paymentMethod: string
  }

  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value)
  }

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(e.target.value)
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvv(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica
    if (!cardNumber || !expiryDate || !cvv) {
      alert('Por favor, complete todos los campos.')
      return
    }

    // Formatear los datos para la REQ-001
    const orderData = {
      email: formData.email,
      phoneNumber: formData.telefono,
      totalAmount: totalFinal, // Asignar el total final calculado
      paymentMethod: paymentMethod,
      paymentDetails: {
        cardNumber: cardNumber.replace(/\s+/g, ''),
        cardHolderName: `${formData.nombre} ${formData.apellido}`,
        expirationMonth: expiryDate.split('/')[0],
        expirationYear: '20' + expiryDate.split('/')[1],
        securityCode: cvv,
      },
      shippingAddress: {
        country: formData.pais,
        addressLine1: formData.direccion,
        addressLine2: formData.direccion2,
        state: formData.estado,
        city: formData.ciudad,
        postalCode: formData.codigoPostal,
        description: formData.referencia,
      },
      items: productos.map((producto, index) => ({
        productId: index + 1, // Usar índices como ejemplo, ajustar según sea necesario
        quantity: producto.cantidad || 1,
        price: parseFloat(producto.precio.replace('S/ ', '')), // Eliminar la "S/" del precio y convertirlo a número
      })),
    }
    // Imprimir el JSON en consola
    console.log('Datos de la orden:', orderData)
    /*
    try {
      const response = await fetch('http://localhost:4000/api/orders', {
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
      console.log('Respuesta de la API:', data)

      const navigationState = {
        orderResponse: {
          order: {
            orderNumber: data.id.toString(), // Usamos el id como número de orden
            createdAt: data.createdAt,
            estimatedDeliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Estimamos 7 días para la entrega
            status: data.status,
            paymentMethod: data.paymentMethod,
            paymentStatus: data.paymentStatus,
            totalAmount: data.totalAmount
          },
          shippingAddress: data.shippingAddress,
        },
        productos: productos,
      }
      console.log('Estado de navegación:', navigationState)

      navigate('/orden-confirmada', {
        state: {
          orderResponse: {
            order: {
              orderNumber: data.id.toString(),
              createdAt: data.createdAt,
              estimatedDeliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            }
          },
          productos: productos,
          formData: formData,
          totalFinal: totalFinal
        }
      })
    } catch (error) {
      console.error('Error en la solicitud:', error)
      alert('Hubo un problema al procesar su pago. Inténtelo nuevamente.')
    }
  }*/
    const mockServerResponse = {
      id: Math.floor(Math.random() * 1000000).toString(),
      createdAt: new Date().toISOString(),
      status: 'CONFIRMED',
      paymentStatus: 'PAID',
      ...orderData,
    }

    console.log('Datos de la orden:', mockServerResponse)

    const navigationState = {
      orderResponse: {
        order: {
          orderNumber: mockServerResponse.id,
          createdAt: mockServerResponse.createdAt,
          estimatedDeliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: mockServerResponse.status,
          paymentMethod: mockServerResponse.paymentMethod,
          paymentStatus: mockServerResponse.paymentStatus,
          totalAmount: mockServerResponse.totalAmount,
        },
        shippingAddress: mockServerResponse.shippingAddress,
      },
      productos: productos,
      formData: formData,
      totalFinal: totalFinal,
    }

    navigate('/orden-confirmada', { state: navigationState })
  }
  const orderSteps = [
    { label: 'Carrito', isCompleted: true },
    { label: 'Confirmación de Pago', isCompleted: true },
    { label: 'Entrega', isCompleted: false },
  ]

  const handleReturn = () => {
    navigate(-1)
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

        <div className="flex justify-between">
          <div className="mr-8 max-w-md flex-grow">
            <h2 className="mb-1 text-2xl font-bold">Agregar método de pago</h2>
            <p className="mb-4 text-base text-black">Tarjeta débito/crédito</p>

            <hr className="mb-6 border-gray-300" />

            <form onSubmit={handleSubmit} className="mb-8 flex flex-col">
              <div className="flex space-x-4">
                <div className="mb-4 flex-1">
                  <label htmlFor="cardNumber" className="mb-2 block font-medium">
                    Número de tarjeta *
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    required
                    className="w-full rounded border border-gray-300 px-3 py-2"
                  />
                </div>

                <div className="flex-1">
                  <label htmlFor="expiryDate" className="mb-2 block font-medium">
                    Fecha de vencimiento *
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    required
                    placeholder="MM/YY"
                    className="w-full rounded border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>

              <div className="mb-4 w-1/3">
                <label htmlFor="cvv" className="mb-2 block font-medium">
                  CVV *
                </label>
                <input
                  type="text"
                  id="cvv"
                  value={cvv}
                  onChange={handleCvvChange}
                  required
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>

              <hr className="mb-4 border-gray-300" />

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-[#1A6DAF] px-4 py-2 font-bold text-white transition-colors hover:bg-blue-700"
                >
                  Confirmar
                </button>

                <button
                  type="button"
                  onClick={handleReturn}
                  className="flex-1 rounded-full bg-[#FDCD11] px-4 py-2 font-bold text-white transition-colors hover:bg-yellow-500"
                >
                  Regresar
                </button>
              </div>
            </form>
          </div>

          <div className="w-1/3">
            <div className="mb-4 flex justify-end">
              <OrderProgress steps={orderSteps} />
            </div>
            <div className="rounded bg-[#F5F7FF] p-6 shadow-md">
              <h2 className="mb-4 text-xl font-bold">Resumen del pedido</h2>
              <ul className="mb-4">
                {productos.map((producto, index) => (
                  <li key={index} className="mb-4 flex items-start">
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="mr-4 h-16 w-16 object-cover"
                    />
                    <div className="flex flex-grow flex-col">
                      <h3 className="font-semibold">{producto.nombre}</h3>
                      <div className="mt-1 flex items-center justify-between">
                        <span>Cant: {producto.cantidad}</span>
                        <span className="font-medium">
                          S/ {parseFloat(producto.precio.replace('S/ ', '')).toFixed(2)}
                        </span>
                      </div>
                    </div>
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

export default AgregarMetodoPago
