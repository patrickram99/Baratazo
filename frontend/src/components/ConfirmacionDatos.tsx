import React, { useState } from "react";
import "./ConfirmacionDatos.css";

const ConfirmacionDatos: React.FC = () => {
  const [usarDatosCuenta, setUsarDatosCuenta] = useState(false);

  const handleUsarDatosCuentaChange = () => {
    setUsarDatosCuenta(!usarDatosCuenta);
  };

  return (
    <div>
      <div className="confirmacion-datos-container">
        <h1>Confirmación de datos</h1>
        <div className="form-container">
          <form>
            {/* Fila de Correo Electrónico y Checkbox */}
            <div className="input-group email-group">
              <label htmlFor="email">Dirección de correo electrónico *</label>
              <input type="email" id="email" required />
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="usar-datos-cuenta"
                  checked={usarDatosCuenta}
                  onChange={handleUsarDatosCuentaChange}
                />
                <label htmlFor="usar-datos-cuenta">
                  Usar datos predefinidos de la cuenta?
                </label>
              </div>
            </div>

            {/* Fila de Nombre y Apellido */}
            <div className="input-group flex-row">
              <div className="flex-item">
                <label htmlFor="nombre">Nombre *</label>
                <input type="text" id="nombre" required />
              </div>
              <div className="flex-item">
                <label htmlFor="apellido">Apellido *</label>
                <input type="text" id="apellido" required />
              </div>
            </div>

            {/* Fila de Número de Teléfono */}
            <div className="input-group">
              <label htmlFor="telefono">Número de teléfono *</label>
              <input type="tel" id="telefono" required />
            </div>

            {/* Fila de País y Estado/Provincia */}
            <div className="input-group flex-row">
              <div className="flex-item">
                <label htmlFor="pais">País *</label>
                <select id="pais" required>
                  <option value="peru">Perú</option>
                  <option value="argentina">Argentina</option>
                  <option value="chile">Chile</option>
                  {/* Agrega más opciones según sea necesario */}
                </select>
              </div>
              <div className="flex-item">
                <label htmlFor="estado">Estado/Provincia *</label>
                <input type="text" id="estado" required />
              </div>
            </div>

            {/* Fila de Dirección y Ciudad */}
            <div className="input-group flex-row">
              <div className="flex-item">
                <label htmlFor="direccion">Dirección *</label>
                <input type="text" id="direccion" required />
              </div>
              <div className="flex-item">
                <label htmlFor="ciudad">Ciudad *</label>
                <input type="text" id="ciudad" required />
              </div>
            </div>

            {/* Fila de Código Postal y Referencia */}
            <div className="input-group flex-row">
              <div className="flex-item">
                <label htmlFor="codigo-postal">Código Postal *</label>
                <input type="text" id="codigo-postal" required />
              </div>
              <div className="flex-item">
                <label htmlFor="referencia">Referencia</label>
                <input type="text" id="referencia" />
              </div>
            </div>

            <div className="buttons-container">
              <button type="submit" className="btn">
                Agregar método de pago
              </button>
              <button type="button" className="btn btn-cancel">
                Cancelar
              </button>
            </div>
          </form>

          <div className="resumen-pedido">
            <h2>Resumen del pedido</h2>
            <ul>
              <li className="producto">
                <img src="/img/auriculares1.jpg" alt="Producto 1" />
                Producto 1 - S/ 340.00
              </li>
              <li className="producto">
                <img src="/img/gabinete1.jpg" alt="Producto 2" />
                Producto 2 - S/ 280.00
              </li>
            </ul>
            <h3>Total del pedido: S/ 620.00</h3>
            <div className="metodo-pago">
              <p>Método de pago</p>
              <input
                type="radio"
                id="tarjeta"
                name="metodo-pago"
                value="tarjeta"
              />
              <label htmlFor="tarjeta">Tarjeta débito/crédito</label>
              <input
                type="radio"
                id="efectivo"
                name="metodo-pago"
                value="efectivo"
              />
              <label htmlFor="efectivo">Pago en efectivo</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacionDatos;
