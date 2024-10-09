import React from "react";
import "./Header.css"; // Crear un archivo de CSS para Header si lo prefieres

const Header: React.FC = () => {
  return (
    <header>
      <div className="info-header">
        <div className="izquierda">Lun - Sáb: 9:00 AM - 8:45 PM</div>
        <div className="centro">
          Visite nuestra tienda en: 529 C. Juan Manuel Polar
        </div>
        <div className="derecha">
          Contáctanos: (+51) 926 770 008
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fab fa-facebook"></i>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
