import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="bg-plomo">
      <div className="flex flex-col items-center justify-between px-4 py-2 text-sm text-white sm:flex-row sm:text-base">
        <div className="mb-2 w-full text-center sm:mb-0 sm:flex-1 sm:text-left">
          Lun - Sáb: 9:00 AM - 8:45 PM
        </div>
        <div className="mb-2 w-full text-center sm:mb-0 sm:flex-1">
          Visite nuestra tienda en: 529 C. Juan Manuel Polar
        </div>
        <div className="w-full text-center sm:flex-1 sm:text-right">
          <div className="mb-2 sm:mb-0">Contáctanos: (+51) 926 770 008</div>
          <div>
            <a href="#" className="ml-2 inline-block">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="ml-2 inline-block">
              <i className="fab fa-facebook"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
