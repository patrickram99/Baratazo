import "./Header.css"; // Archivo CSS para estilos
import logobaratazomovil from "../assets/logobaratazomovil.png";
const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={logobaratazomovil} alt="Logo" />
      </div>
      <div className="header-info">
        <p>Lun - Sáb: 9:00 AM - 8:45 PM</p>
      </div>
      <div className="header-contact">
        <button>Contáctanos</button>
      </div>
    </header>
  );
};

export default Header;
