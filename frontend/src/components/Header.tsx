import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800">
      <div className="bg-gray-700 text-white flex flex-col sm:flex-row justify-between items-center px-4 py-2 text-sm sm:text-base">
        <div className="w-full sm:flex-1 text-center sm:text-left mb-2 sm:mb-0">
          Lun - Sáb: 9:00 AM - 8:45 PM
        </div>
        <div className="w-full sm:flex-1 text-center mb-2 sm:mb-0">
          Visite nuestra tienda en: 529 C. Juan Manuel Polar
        </div>
        <div className="w-full sm:flex-1 text-center sm:text-right">
          <div className="mb-2 sm:mb-0">Contáctanos: (+51) 926 770 008</div>
          <div>
            <a href="#" className="inline-block ml-2">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="inline-block ml-2">
              <i className="fab fa-facebook"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
