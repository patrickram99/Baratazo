import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800">
      <div className="bg-gray-700 text-white flex justify-between items-center px-5 py-2">
        <div className="flex-1 text-left">Lun - Sáb: 9:00 AM - 8:45 PM</div>
        <div className="flex-1 text-center">
          Visite nuestra tienda en: 529 C. Juan Manuel Polar
        </div>
        <div className="flex-1 text-right">
          Contáctanos: (+51) 926 770 008
          <a href="#" className="ml-2">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="ml-2">
            <i className="fab fa-facebook"></i>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
