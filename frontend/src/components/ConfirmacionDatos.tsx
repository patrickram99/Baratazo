import React, { useState } from 'react'

const ConfirmacionDatos: React.FC = () => {
  const [usarDatosCuenta, setUsarDatosCuenta] = useState(false)

  const handleUsarDatosCuentaChange = () => {
    setUsarDatosCuenta(!usarDatosCuenta)
  }

  return (
    <div className="bg-white p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-1">
          {' '}
          {/* Tamaño de texto reducido */}
          <h2 className="text-xs">Home &gt; Carrito &gt; Confirmación</h2>
        </div>

        <h1 className="mb-6 text-3xl font-bold">Confirmación de datos</h1>
        <div className="-mx-4 flex flex-wrap">
          <form className="mb-8 w-full px-4 lg:w-2/3">
            {/* El resto del código del formulario permanece igual */}
            <label htmlFor="email" className="mb-2 block font-semibold">
              Dirección de correo electrónico *
            </label>
            <div className="flex items-center">
              <input
                type="email"
                id="email"
                required
                className="w-1/2 rounded border border-gray-300 p-2"
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
                className="w-1/2 rounded border border-gray-300 p-2"
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

            <div className="mt-8 flex">
              <button
                type="submit"
                className="mr-4 rounded-full bg-[#1A6DAF] px-6 py-2 text-white transition duration-300 hover:bg-blue-600"
              >
                Agregar método de pago
              </button>
              <button
                type="button"
                className="rounded-full bg-[#FDCD11] px-6 py-2 text-white transition duration-300 hover:bg-yellow-400"
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

        {/* Sección agregada para Soporte de Producto, Cuenta Personal y Ahorros Increíbles */}
        <div className="mt-8 flex justify-center space-x-12">
          {' '}
          {/* Espacio horizontal reducido */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold">Soporte de Producto</h3>
            <img
              src="/path/to/circular-image1.jpg"
              alt="Imagen circular"
              className="h-12 w-12 rounded-full"
            />
            <p>Información sobre soporte.</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold">Cuenta Personal</h3>
            <img
              src="/path/to/circular-image2.jpg"
              alt="Imagen circular"
              className="h-12 w-12 rounded-full"
            />
            <p>Gestión de tu cuenta.</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold">Ahorros Increíbles</h3>
            <img
              src="/path/to/circular-image3.jpg"
              alt="Imagen circular"
              className="h-12 w-12 rounded-full"
            />
            <p>Aprovecha los mejores descuentos.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmacionDatos
