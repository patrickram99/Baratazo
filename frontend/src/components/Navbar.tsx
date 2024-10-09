import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img src="/img/logo.png" alt="Logo" className="h-8 w-auto" />
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {[
              "Laptops",
              "Desktop PCs",
              "Componentes",
              "Periféricos",
              "Subasta",
              "Promociones",
              "Reportes",
            ].map((item) => (
              <Link
                key={item}
                to="#"
                className="text-black hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-transparent hover:bg-gray-100 text-black font-semibold py-2 px-4 border border-black rounded transition duration-300">
              Iniciar Sesión
            </button>
            <button className="bg-transparent hover:bg-gray-100 text-black font-semibold py-2 px-4 border border-black rounded transition duration-300">
              Registrarse
            </button>
            <button className="text-black hover:text-gray-700 p-2">
              <i className="fas fa-search"></i>
            </button>
            <Link to="/carrito" className="text-black hover:text-gray-700 p-2">
              <i className="fas fa-shopping-cart"></i>
            </Link>
            <button className="text-black hover:text-gray-700 p-2">
              <i className="fas fa-user"></i>
            </button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {[
              "Laptops",
              "Desktop PCs",
              "Componentes",
              "Periféricos",
              "Subasta",
              "Promociones",
              "Reportes",
            ].map((item) => (
              <Link
                key={item}
                to="#"
                className="text-black hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <button className="bg-transparent hover:bg-gray-100 text-black font-semibold py-2 px-4 border border-black rounded w-full mb-2 transition duration-300">
                Iniciar Sesión
              </button>
            </div>
            <div className="flex items-center px-5">
              <button className="bg-transparent hover:bg-gray-100 text-black font-semibold py-2 px-4 border border-black rounded w-full mb-2 transition duration-300">
                Registrarse
              </button>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <button className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-gray-700 hover:bg-gray-100 w-full text-left">
                <i className="fas fa-search mr-2"></i> Buscar
              </button>
              <Link
                to="/carrito"
                className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                <i className="fas fa-shopping-cart mr-2"></i> Carrito
              </Link>
              <button className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-gray-700 hover:bg-gray-100 w-full text-left">
                <i className="fas fa-user mr-2"></i> Perfil
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
