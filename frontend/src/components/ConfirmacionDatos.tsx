import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

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

const ConfirmacionDatos: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { productos, totalFinal } = location.state as {
    productos: Producto[]
    totalFinal: number
  }
  const [usarDatosCuenta, setUsarDatosCuenta] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<string>('')
  const [formData, setFormData] = useState({
    email: '',
    nombre: '',
    apellido: '',
    telefono: '',
    pais: '',
    estado: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    referencia: '',
  })
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }))
  }

  const validateForm = () => {
    const requiredFields = [
      'email',
      'nombre',
      'apellido',
      'telefono',
      'pais',
      'estado',
      'direccion',
      'ciudad',
      'codigoPostal',
    ]
    const isValid = requiredFields.every(field => formData[field as keyof typeof formData])
    setShowErrorMessage(!isValid)
    return isValid
  }

  const handleUsarDatosCuentaChange = () => {
    setUsarDatosCuenta(!usarDatosCuenta)
  }

  const orderSteps = [
    { label: 'Carrito', isCompleted: true },
    { label: 'Confirmación de Pago', isCompleted: true },
    { label: 'Entrega', isCompleted: false },
  ]

  const handleAgregarMetodoPago = () => {
    if (validateForm()) {
      navigate('/agregar-metodo-pago', {
        state: {
          productos,
          totalFinal,
          formData,
          paymentMethod,
          orderSteps: [
            { label: 'Carrito', isCompleted: true },
            { label: 'Confirmación de Pago', isCompleted: true },
            { label: 'Método de Pago', isCompleted: false },
          ],
        },
      })
    } else {
      setShowErrorMessage(true)
    }
  }

  const handleCancel = () => {
    navigate(-1)
  }

  useEffect(() => {
    if (showErrorMessage) {
      const timer = setTimeout(() => {
        setShowErrorMessage(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showErrorMessage])
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-1">
          <span className="text-gray-900">Home </span>
          <span className="text-[#1A6DAF]">&gt; </span>
          <span className="text-gray-900">Carrito</span>
          <span className="text-[#1A6DAF]">&gt; </span>
          <span className="text-gray-900">Confirmación</span>
        </nav>

        <h1 className="text-3xl font-bold">Confirmación de datos</h1>

        <div className="-mx-4 flex flex-wrap">
          <form className="mb-8 w-full lg:w-2/3">
            {showErrorMessage && (
              <div className="mb-4 rounded bg-red-100 p-4 text-red-700">
                ¡Debes de rellenar estos campos primero!
              </div>
            )}

            <label htmlFor="email" className="mb-2 block font-semibold">
              Dirección de correo electrónico *
            </label>
            <div className="flex items-center">
              <input
                type="email"
                id="email"
                required
                className="w-1/2 rounded border border-gray-300 p-2"
                value={formData.email}
                onChange={handleInputChange}
              />
              <div className="ml-4 mt-0 flex items-center">
                <input
                  type="checkbox"
                  id="usar-datos-cuenta"
                  checked={usarDatosCuenta}
                  onChange={handleUsarDatosCuentaChange}
                  className="mr-2"
                />
                <label htmlFor="usar-datos-cuenta" className="font-semibold">
                  Usar datos predefinidos de la cuenta?
                </label>
              </div>
            </div>

            <div className="-mx-2 mb-6 flex flex-wrap">
              <div className="mb-4 w-full px-2 md:mb-0 md:w-1/2">
                <label htmlFor="nombre" className="mb-2 block font-semibold">
                  Nombre *
                </label>
                <input
                  type="text"
                  id="nombre"
                  required
                  className="w-full rounded border border-gray-300 p-2"
                  value={formData.nombre}
                  onChange={handleInputChange}
                />
              </div>

              <div className="w-full px-2 md:w-1/2">
                <label htmlFor="apellido" className="mb-2 block font-semibold">
                  Apellido *
                </label>
                <input
                  type="text"
                  id="apellido"
                  required
                  className="w-full rounded border border-gray-300 p-2"
                  value={formData.apellido}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="telefono" className="mb-2 block font-semibold">
                Número de teléfono *
              </label>
              <input
                type="tel"
                id="telefono"
                required
                className="w-1/2 rounded border border-gray-300 p-2"
                value={formData.telefono}
                onChange={handleInputChange}
              />
            </div>

            <div className="-mx-2 mb-6 flex flex-wrap">
              <div className="mb-4 w-full px-2 md:mb-0 md:w-1/2">
                <label htmlFor="pais" className="mb-2 block font-semibold">
                  País *
                </label>
                <select
                  id="pais"
                  required
                  className="w-full rounded border border-gray-300 p-2"
                  value={formData.pais}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccione un país</option>
                  <option value="peru">Perú</option>
                  <option value="argentina">Argentina</option>
                  <option value="chile">Chile</option>
                </select>
              </div>
              <div className="w-full px-2 md:w-1/2">
                <label htmlFor="estado" className="mb-2 block font-semibold">
                  Estado/Provincia *
                </label>
                <input
                  type="text"
                  id="estado"
                  required
                  className="w-full rounded border border-gray-300 p-2"
                  value={formData.estado}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="-mx-2 mb-6 flex flex-wrap">
              <div className="mb-4 w-full px-2 md:mb-0 md:w-1/2">
                <label htmlFor="direccion" className="mb-2 block font-semibold">
                  Dirección *
                </label>
                <input
                  type="text"
                  id="direccion"
                  required
                  className="w-full rounded border border-gray-300 p-2"
                  value={formData.direccion}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full px-2 md:w-1/2">
                <label htmlFor="ciudad" className="mb-2 block font-semibold">
                  Ciudad *
                </label>
                <input
                  type="text"
                  id="ciudad"
                  required
                  className="w-full rounded border border-gray-300 p-2"
                  value={formData.ciudad}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="-mx-2 mb-6 flex flex-wrap">
              <div className="mb-4 w-full px-2 md:mb-0 md:w-1/2">
                <label htmlFor="codigo-postal" className="mb-2 block font-semibold">
                  Código Postal *
                </label>
                <input
                  type="text"
                  id="codigoPostal"
                  required
                  className="w-full rounded border border-gray-300 p-2"
                  value={formData.codigoPostal}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full px-2 md:w-1/2">
                <label htmlFor="referencia" className="mb-2 block font-semibold">
                  Referencia
                </label>
                <input
                  type="text"
                  id="referencia"
                  className="w-full rounded border border-gray-300 p-2"
                />
              </div>
            </div>

            <div className="mt-8 flex">
              <button
                type="button"
                onClick={handleAgregarMetodoPago}
                className={`mr-4 rounded-full px-6 py-2 text-white transition duration-300 ${
                  showErrorMessage
                    ? 'cursor-not-allowed bg-gray-400'
                    : 'bg-[#1A6DAF] hover:bg-blue-600'
                }`}
                disabled={showErrorMessage}
              >
                Agregar método de pago
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-full bg-[#FDCD11] px-6 py-2 text-white transition duration-300 hover:bg-yellow-400"
              >
                Cancelar
              </button>
            </div>
          </form>

          <div className="w-full px-4 lg:w-1/3">
            <div className="mb-4 flex justify-end">
              <OrderProgress steps={orderSteps} />
            </div>
            <div className="mb-6 rounded bg-[#F5F7FF] p-6 shadow-md">
              <h2 className="mb-4 text-xl font-bold">Resumen del pedido</h2>
              {productos && productos.length > 0 ? (
                <ul>
                  {productos.map((producto: Producto, index: number) => (
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
              ) : (
                <p>No hay productos en el carrito.</p>
              )}
              <div className="flex justify-between border-t pt-4">
                <span className="font-bold">Total del pedido:</span>
                <span className="font-bold">S/. {totalFinal.toFixed(2)}</span>
              </div>
            </div>

            <div className="rounded bg-white p-6 shadow-md">
              <h3 className="mb-2 font-bold">Método de pago</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mr-2"
                  />
                  Tarjeta débito/crédito
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                    className="mr-2"
                  />
                  Pago efectivo
                </label>
              </div>
              {!paymentMethod && <p className="mt-2 text-red-500">Seleccione su método de pago</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmacionDatos
