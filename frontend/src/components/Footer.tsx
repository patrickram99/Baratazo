import React from 'react'

const Footer: React.FC = () => {
  return (
    <>
      {/* Sección agregada para Soporte de Producto, Cuenta Personal y Ahorros Increíbles */}
      <div
        className="mb-8 mt-16 flex justify-center space-x-12"
        style={{ backgroundColor: '#F5F7FF' }}
      >
        <div className="flex flex-col items-center">
          <img
            src="/src/Icons/SoporteProducto.png"
            alt="Imagen circular"
            className="h-12 w-12 rounded-full"
          />
          <h3 className="mt-2 text-lg font-semibold">Soporte de Producto</h3>
          <p className="text-center text-sm">Garantía disponible garantizada por 3 años.</p>
        </div>

        <div className="flex flex-col items-center">
          <img
            src="/src/Icons/CuentaPersonal.png"
            alt="Imagen circular"
            className="h-12 w-12 rounded-full"
          />
          <h3 className="mt-2 text-lg font-semibold">Cuenta Personal</h3>
          <p className="text-center text-sm">
            Obtén grandes descuentos, delivery <br /> gratis y soporte por un especialista.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <img
            src="/src/Icons/AhorrosIncreibles.png"
            alt="Imagen circular"
            className="h-12 w-12 rounded-full"
          />
          <h3 className="mt-2 text-lg font-semibold">Ahorros Increíbles</h3>
          <p className="text-center text-sm">
            Hasta un 70% de descuento en <br /> productos nuevos.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black py-8 text-white">
        <div className="container mx-auto px-4">
          {/* Suscripción */}
          <div className="flex flex-col items-center justify-between border-b border-gray-700 pb-8 sm:flex-row">
            <div>
              <h3 className="text-2xl font-bold">Suscríbete a nuestro boletín.</h3>
              <p className="text-sm text-gray-400">
                Sea el primero en enterarse de las últimas ofertas
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <input
                type="email"
                placeholder="Ingresa tu gmail"
                className="rounded-l-md p-2 text-black"
              />
              <button className="rounded-r-md bg-yellow-500 p-2 text-black">Suscribirse</button>
            </div>
          </div>

          {/* Links de navegación */}
          <div className="grid grid-cols-2 gap-8 py-8 sm:grid-cols-5">
            <div>
              <h4 className="font-semibold">Datos</h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-400">
                <li>Sobre nosotros</li>
                <li>Política de privacidad</li>
                <li>Buscar</li>
                <li>Términos</li>
                <li>Pedidos y devoluciones</li>
                <li>Contactanos</li>
                <li>Búsqueda Avanzada</li>
                <li>Suscripción al boletín</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Partes de PC</h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-400">
                <li>CPU's</li>
                <li>Add On Cards</li>
                <li>Hard Drives (Internal)</li>
                <li>Tarjetas de videos</li>
                <li>Periféricos</li>
                <li>Cases / Fuentes de alimentación</li>
                <li>Memorias RAM</li>
                <li>Software</li>
                <li>Audífonos / Cascos</li>
                <li>Motherboards</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Desktop PCs</h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-400">
                <li>PC personalizadas</li>
                <li>Servidores</li>
                <li>PC todo en uno MSI</li>
                <li>PC HP/Compaq</li>
                <li>PC ASUS</li>
                <li>PC Tees</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Laptops</h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-400">
                <li>Portátiles de uso diario</li>
                <li>Serie MSI Workstation</li>
                <li>Serie MSI Prestige</li>
                <li>Tablets y pads</li>
                <li>Notebooks</li>
                <li>Portátiles Infinity Gaming</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Información</h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-400">
                <li>Dirección: 529 C. Juan Manuel Polar, Arequipa, Perú</li>
                <li>Teléfono: (+51) 926 770 008</li>
                <li>Horario: Lunes - Sábado: 9:00 AM - 8:45 PM</li>
                <li>Domingo: 11:00 AM - 5:00 PM</li>
                <li>
                  Gmail:{' '}
                  <a href="mailto:baratazo@gmail.com" className="text-yellow-500">
                    baratazo@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Redes sociales y medios de pago */}
          <div className="flex items-center justify-between border-t border-gray-700 pt-4">
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <div className="flex space-x-4">
              <img src="/img/interbank.png" alt="Interbank" className="h-8" />
              <img src="/img/bcp.png" alt="BCP" className="h-8" />
              <img src="/img/yape.png" alt="Yape" className="h-8" />
            </div>
            <p className="text-sm text-gray-400">
              &copy; 2024 Baratazo. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
