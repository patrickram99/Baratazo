import "./Navbar.css"; // Archivo CSS para estilos

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-search">
        <input type="text" placeholder="Buscar..." />
      </div>
      <button className="btn">
        <i className="fas fa-shopping-cart"></i>
      </button>
      <button className="btn">
        <i className="fas fa-sign-in-alt"></i> Iniciar Sesión
      </button>
    </nav>
  );
};

export default Navbar;
