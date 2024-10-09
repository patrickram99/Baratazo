import React, { useState } from "react";

const ConfirmacionDatos: React.FC = () => {
  const [usarDatosCuenta, setUsarDatosCuenta] = useState(false);

  const handleUsarDatosCuentaChange = () => {
    setUsarDatosCuenta(!usarDatosCuenta);
  };

  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Confirmación de datos</h1>
        <div className="flex flex-wrap -mx-4">
          <form className="w-full lg:w-2/3 px-4 mb-8">
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 font-semibold">
                Dirección de correo electrónico *
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="usar-datos-cuenta"
                  checked={usarDatosCuenta}
                  onChange={handleUsarDatosCuentaChange}
                  className="mr-2"
                />
                <label htmlFor="usar-datos-cuenta">
                  Usar datos predefinidos de la cuenta?
                </label>
              </div>
            </div>

            <div className="flex flex-wrap -mx-2 mb-6">
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label htmlFor="nombre" className="block mb-2 font-semibold">
                  Nombre *
                </label>
                <input
                  type="text"
                  id="nombre"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="w-full md:w-1/2 px-2">
                <label htmlFor="apellido" className="block mb-2 font-semibold">
                  Apellido *
                </label>
                <input
                  type="text"
                  id="apellido"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="telefono" className="block mb-2 font-semibold">
                Número de teléfono *
              </label>
              <input
                type="tel"
                id="telefono"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex flex-wrap -mx-2 mb-6">
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label htmlFor="pais" className="block mb-2 font-semibold">
                  País *
                </label>
                <select
                  id="pais"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="peru">Perú</option>
                  <option value="argentina">Argentina</option>
                  <option value="chile">Chile</option>
                </select>
              </div>
              <div className="w-full md:w-1/2 px-2">
                <label htmlFor="estado" className="block mb-2 font-semibold">
                  Estado/Provincia *
                </label>
                <input
                  type="text"
                  id="estado"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-2 mb-6">
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label htmlFor="direccion" className="block mb-2 font-semibold">
                  Dirección *
                </label>
                <input
                  type="text"
                  id="direccion"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="w-full md:w-1/2 px-2">
                <label htmlFor="ciudad" className="block mb-2 font-semibold">
                  Ciudad *
                </label>
                <input
                  type="text"
                  id="ciudad"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-2 mb-6">
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label
                  htmlFor="codigo-postal"
                  className="block mb-2 font-semibold"
                >
                  Código Postal *
                </label>
                <input
                  type="text"
                  id="codigo-postal"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="w-full md:w-1/2 px-2">
                <label
                  htmlFor="referencia"
                  className="block mb-2 font-semibold"
                >
                  Referencia
                </label>
                <input
                  type="text"
                  id="referencia"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded mr-4 hover:bg-blue-600"
              >
                Agregar método de pago
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </form>

          <div className="w-full lg:w-1/3 px-4">
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>
              <ul className="mb-4">
                <li className="flex items-center mb-2">
                  <img
                    src="/img/auriculares1.jpg"
                    alt="Producto 1"
                    className="w-12 h-12 object-cover mr-4"
                  />
                  <span>Producto 1 - S/ 340.00</span>
                </li>
                <li className="flex items-center mb-2">
                  <img
                    src="/img/gabinete1.jpg"
                    alt="Producto 2"
                    className="w-12 h-12 object-cover mr-4"
                  />
                  <span>Producto 2 - S/ 280.00</span>
                </li>
              </ul>
              <h3 className="font-bold mb-4">Total del pedido: S/ 620.00</h3>
              <div>
                <p className="font-semibold mb-2">Método de pago</p>
                <div className="flex items-center mb-2">
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
  );
};

export default ConfirmacionDatos;
