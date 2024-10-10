import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <img src="/img/logo.png" alt="Logo" className="h-8 w-auto" />
          </div>
          <div className="hidden items-center space-x-4 md:flex">
            {[
              'Laptops',
              'Desktop PCs',
              'Componentes',
              'Periféricos',
              'Subasta',
              'Promociones',
              'Reportes',
            ].map(item => (
              <Link
                key={item}
                to="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-black hover:text-gray-700"
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="hidden items-center space-x-4 md:flex">
            <button className="rounded border border-black bg-transparent px-4 py-2 font-semibold text-black transition duration-300 hover:bg-gray-100">
              Iniciar Sesión
            </button>
            <button className="rounded border border-black bg-transparent px-4 py-2 font-semibold text-black transition duration-300 hover:bg-gray-100">
              Registrarse
            </button>
            <button className="p-2 text-black hover:text-gray-700">
              <i className="fas fa-search"></i>
            </button>
            <Link to="/carrito" className="p-2 text-black hover:text-gray-700">
              <i className="fas fa-shopping-cart"></i>
            </Link>
            <button className="p-2 text-black hover:text-gray-700">
              <i className="fas fa-user"></i>
            </button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {[
              'Laptops',
              'Desktop PCs',
              'Componentes',
              'Periféricos',
              'Subasta',
              'Promociones',
              'Reportes',
            ].map(item => (
              <Link
                key={item}
                to="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-100"
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-200 pb-3 pt-4">
            <div className="flex items-center px-5">
              <button className="mb-2 w-full rounded border border-black bg-transparent px-4 py-2 font-semibold text-black transition duration-300 hover:bg-gray-100">
                Iniciar Sesión
              </button>
            </div>
            <div className="flex items-center px-5">
              <button className="mb-2 w-full rounded border border-black bg-transparent px-4 py-2 font-semibold text-black transition duration-300 hover:bg-gray-100">
                Registrarse
              </button>
            </div>
            <div className="mt-3 space-y-1 px-2">
              <button className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-black hover:bg-gray-100 hover:text-gray-700">
                <i className="fas fa-search mr-2"></i> Buscar
              </button>
              <Link
                to="/carrito"
                className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <i className="fas fa-shopping-cart mr-2"></i> Carrito
              </Link>
              <button className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-black hover:bg-gray-100 hover:text-gray-700">
                <i className="fas fa-user mr-2"></i> Perfil
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
