import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const MainNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate() // Asegúrate de que `navigate` esté inicializado correctamente.

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const WishList = () => {
    navigate('/') // Cambia Navigate por navigate
  }

  const CerrarSesion = () => {
    navigate('/') // Cambia Navigate por navigate
  }

  const navigationItems = [
    { name: 'Laptops', path: '#' },
    { name: 'Desktop PCs', path: '#' },
    { name: 'Componentes', path: '#' },
    { name: 'Periféricos', path: '#' },
    { name: 'Subasta', path: '#' },
    { name: 'Promociones', path: '#' },
    { name: 'Dashboard', path: '/dashboard' },
  ]

  return (
    <header>
      {/* Header Section */}
      <div className="bg-plomo">
        <div className="flex flex-col items-center justify-between px-4 py-2 text-sm text-white sm:flex-row sm:text-base">
          <div className="mb-2 w-full text-center sm:mb-0 sm:flex-1 sm:text-left">
            Lun - Sáb: 9:00 AM - 8:45 PM
          </div>
          <div className="mb-2 w-full text-center sm:mb-0 sm:flex-1">
            Visite nuestra tienda en: 529 C. Juan Manuel Polar
          </div>
          <div className="w-full text-center sm:flex-1 sm:text-right">
            <div className="mb-2 flex items-center justify-end sm:mb-0">
              <span>Contáctanos: (+51) 926 770 008</span>
              <a href="#" className="ml-2 inline-block">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="ml-2 inline-block">
                <i className="fab fa-facebook"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar Section */}
      <nav className="bg-white shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex items-center">
              <img src="/img/logo.png" alt="Logo" className="h-8 w-auto" />
            </div>
            <div className="hidden items-center space-x-4 md:flex">
              {navigationItems.map(item => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="rounded-md px-3 py-2 text-sm font-medium text-black hover:text-gray-700"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="hidden items-center space-x-1 md:flex">
              <button
                onClick={WishList}
                className="mb-2 rounded-full border border-[#1A6DAF] bg-transparent px-6 py-2 font-semibold text-black transition duration-300 hover:bg-gray-100"
                style={{ color: '#1A6DAF' }}
              >
                Lista de Deseos
              </button>

              <button
                onClick={CerrarSesion}
                className="mb-2 rounded-full border border-[#FDCD11] bg-transparent px-6 py-2 font-semibold text-black transition duration-300 hover:bg-gray-100"
                style={{ color: '#FDCD11' }}
              >
                Cerrar Sesion
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
              {navigationItems.map(item => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-100"
                >
                  {item.name}
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
    </header>
  )
}

export default MainNavigation
