import producto1 from "../assets/producto1.png"; // Importando la imagen
import producto2 from "../assets/producto2.png";
import "./Productos.css";

const Productos = () => {
  return (
    <div className="productos">
      <h2>Nuevos productos</h2>
      <div className="producto-item">
        <img src={producto1} alt="Producto 1" />
        <p>Audífono Gamer, Razer, Blackshark V2 X 7.1</p>
        <span className="precio-anterior">S/.159.99</span>
        <span className="precio-actual">S/.120.00</span>
      </div>
      <div className="producto-item">
        <img src={producto2} alt="Producto 2" />
        <p>Mouse Gaming, Logitech-G, G305 Inalámbrico Lightspeed</p>
        <span className="precio-anterior">S/.140.00</span>
        <span className="precio-actual">S/.119.99</span>
      </div>
    </div>
  );
};

export default Productos;
