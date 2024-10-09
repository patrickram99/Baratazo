import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="/img/logo.png" alt="Logo" />
      </div>
      <ul className="nav-links">
        <li>
          <Link to="#">Laptops</Link>
        </li>
        <li>
          <Link to="#">Desktop PCs</Link>
        </li>
        <li>
          <Link to="#">Componentes</Link>
        </li>
        <li>
          <Link to="#">Periféricos</Link>
        </li>
        <li>
          <Link to="#">Subasta</Link>
        </li>
        <li>
          <Link to="#">Promociones</Link>
        </li>
        <li>
          <Link to="#">Reportes</Link>
        </li>
      </ul>
      <div className="user-options">
        <button className="btn login">Iniciar Sesión</button>
        <button className="btn register">Registrarse</button>
        <button className="btn icon-button">
          <i className="fas fa-search"></i>
        </button>
        <Link to="/carrito">
          <button className="btn icon-button">
            <i className="fas fa-shopping-cart"></i>
          </button>
        </Link>
        <button className="btn user-button">
          <i className="fas fa-user"></i>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
