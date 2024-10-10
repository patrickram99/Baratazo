import React, { useState } from 'react'

const ConfirmacionDatos: React.FC = () => {
  const [usarDatosCuenta, setUsarDatosCuenta] = useState(false)

  const handleUsarDatosCuentaChange = () => {
    setUsarDatosCuenta(!usarDatosCuenta)
  }

  return (
    <div className="bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold">Confirmación de datos</h1>
        <div className="-mx-4 flex flex-wrap">
          <form className="mb-8 w-full px-4 lg:w-2/3">
            <div className="mb-6">
              <label htmlFor="email" className="mb-2 block font-semibold">
                Dirección de correo electrónico *
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full rounded border border-gray-300 p-2"
              />
              <div className="mt-2 flex items-center">
                <input
                  type="checkbox"
                  id="usar-datos-cuenta"
                  checked={usarDatosCuenta}
                  onChange={handleUsarDatosCuentaChange}
                  className="mr-2"
                />
                <label htmlFor="usar-datos-cuenta">Usar datos predefinidos de la cuenta?</label>
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
                className="w-full rounded border border-gray-300 p-2"
              />
            </div>

            <div className="-mx-2 mb-6 flex flex-wrap">
              <div className="mb-4 w-full px-2 md:mb-0 md:w-1/2">
                <label htmlFor="pais" className="mb-2 block font-semibold">
                  País *
                </label>
                <select id="pais" required className="w-full rounded border border-gray-300 p-2">
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
                  id="codigo-postal"
                  required
                  className="w-full rounded border border-gray-300 p-2"
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

            <div className="mt-8">
              <button
                type="submit"
                className="mr-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Agregar método de pago
              </button>
              <button
                type="button"
                className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </form>

          <div className="w-full px-4 lg:w-1/3">
            <div className="rounded bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-bold">Resumen del pedido</h2>
              <ul className="mb-4">
                <li className="mb-2 flex items-center">
                  <img
                    src="/img/auriculares1.jpg"
                    alt="Producto 1"
                    className="mr-4 h-12 w-12 object-cover"
                  />
                  <span>Producto 1 - S/ 340.00</span>
                </li>
                <li className="mb-2 flex items-center">
                  <img
                    src="/img/gabinete1.jpg"
                    alt="Producto 2"
                    className="mr-4 h-12 w-12 object-cover"
                  />
                  <span>Producto 2 - S/ 280.00</span>
                </li>
              </ul>
              <h3 className="mb-4 font-bold">Total del pedido: S/ 620.00</h3>
              <div>
                <p className="mb-2 font-semibold">Método de pago</p>
                <div className="mb-2 flex items-center">
                  <input
                    type="radio"
                    id="tarjeta"
                    name="metodo-pago"
                    value="tarjeta"
                    className="mr-2"
                  />
                  <label htmlFor="tarjeta">Tarjeta débito/crédito</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="efectivo"
                    name="metodo-pago"
                    value="efectivo"
                    className="mr-2"
                  />
                  <label htmlFor="efectivo">Pago en efectivo</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmacionDatos
