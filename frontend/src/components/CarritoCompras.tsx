import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "./CarritoCompras.css";

interface Producto {
  imagen: string;
  nombre: string;
  descripcion: string;
  precio: string;
  cantidad?: number;
}

const CarritoCompras: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([
    {
      imagen: "/img/gabinete1.jpg", // Ruta de la imagen del primer producto
      nombre: "Gabinete Gaming",
      descripcion: "Case con iluminación RGB.",
      precio: "S/ 99.00",
      cantidad: 1,
    },
    {
      imagen: "/img/auriculares1.jpg", // Ruta de la imagen del segundo producto
      nombre: "Auriculares Gaming",
      descripcion: "Auriculares con micrófono.",
      precio: "S/ 89.90",
      cantidad: 1,
    },
  ]);
  const [totalCarrito, setTotalCarrito] = useState<number>(0);
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  useEffect(() => {
    calcularTotal(productos);
  }, [productos]);

  const calcularTotal = (carrito: Producto[]) => {
    const total = carrito.reduce((acc, producto) => {
      const precio = parseFloat(producto.precio.replace("S/ ", ""));
      return acc + precio * (producto.cantidad || 1);
    }, 0);
    setTotalCarrito(total);
  };

  const actualizarCantidad = (index: number, nuevaCantidad: string) => {
    const carrito = [...productos];
    carrito[index].cantidad = parseInt(nuevaCantidad);
    setProductos(carrito);
    calcularTotal(carrito);
  };

  const eliminarProducto = (index: number) => {
    const carrito = productos.filter((_, i) => i !== index);
    setProductos(carrito);
    calcularTotal(carrito);
  };

  const continuarComprando = () => {
    navigate("/"); // Usa navigate para ir a la página principal
  };

  const borrarCarrito = () => {
    setProductos([]);
    setTotalCarrito(0);
  };

  const comprar = () => {
    navigate("/confirmacion"); // Navegar a la página de confirmación
  };

  return (
    <div>
      <main>
        <h1>Carrito de la compra</h1>
        <div className="carrito-container">
          <div className="productos-carrito">
            <table>
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Artículo</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="detalle-producto">
                {productos.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      Tu carrito está vacío.
                    </td>
                  </tr>
                ) : (
                  productos.map((producto, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{producto.nombre}</td>
                      <td>{producto.descripcion}</td>
                      <td>{producto.precio}</td>
                      <td>
                        <input
                          type="number"
                          value={producto.cantidad || 1}
                          min="1"
                          style={{ width: "60px" }} // Ajustar el tamaño de la caja de cantidad
                          onChange={(e) =>
                            actualizarCantidad(index, e.target.value)
                          }
                        />
                      </td>
                      <td>
                        S/{" "}
                        {(
                          parseFloat(producto.precio.replace("S/ ", "")) *
                          (producto.cantidad || 1)
                        ).toFixed(2)}
                      </td>
                      <td>
                        <button onClick={() => eliminarProducto(index)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <aside className="resumen">
            <h2>Resumen</h2>
            <p>Estimar envío e impuestos</p>
            <label htmlFor="pais">País</label>
            <select id="pais">
              <option value="Zimbabue">Zimbabue</option>
              {/* Otros países */}
            </select>
            <label htmlFor="provincia">Estado/Provincia</label>
            <input type="text" id="provincia" />
            <label htmlFor="codigo-postal">Código Postal</label>
            <input type="text" id="codigo-postal" />
            <div className="recoger-tienda">
              <input type="checkbox" id="recoger-tienda" defaultChecked />
              <label htmlFor="recoger-tienda">
                Recoger en tienda: 529 C. Juan Manuel Polar
              </label>
            </div>
            <h3>
              Total: <span id="total">S/ {totalCarrito.toFixed(2)}</span>
            </h3>
            <button className="btn" onClick={comprar}>
              Comprar
            </button>{" "}
            {/* Llama a la función comprar */}
          </aside>
        </div>

        <div className="acciones-carrito">
          <button onClick={continuarComprando} className="btn">
            Continuar comprando
          </button>
          <button onClick={borrarCarrito} className="btn btn-secundario">
            Borrar carrito
          </button>
        </div>
      </main>
    </div>
  );
};

export default CarritoCompras;
