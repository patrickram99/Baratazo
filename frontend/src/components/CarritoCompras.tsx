import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      imagen: "/img/gabinete1.jpg",
      nombre: "Gabinete Gaming",
      descripcion: "Case con iluminación RGB.",
      precio: "S/ 99.00",
      cantidad: 1,
    },
    {
      imagen: "/img/auriculares1.jpg",
      nombre: "Auriculares Gaming",
      descripcion: "Auriculares con micrófono.",
      precio: "S/ 89.90",
      cantidad: 1,
    },
  ]);
  const [totalCarrito, setTotalCarrito] = useState<number>(0);
  const navigate = useNavigate();

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
    navigate("/");
  };

  const borrarCarrito = () => {
    setProductos([]);
    setTotalCarrito(0);
  };

  const comprar = () => {
    navigate("/confirmacion");
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Carrito de la compra
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-4 text-left">Imagen</th>
                  <th className="py-3 px-4 text-left">Artículo</th>
                  <th className="py-3 px-4 text-left">Descripción</th>
                  <th className="py-3 px-4 text-left">Precio</th>
                  <th className="py-3 px-4 text-left">Cantidad</th>
                  <th className="py-3 px-4 text-left">Total</th>
                  <th className="py-3 px-4 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4">
                      Tu carrito está vacío.
                    </td>
                  </tr>
                ) : (
                  productos.map((producto, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-4 px-4">
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="w-20 h-20 object-cover"
                        />
                      </td>
                      <td className="py-4 px-4">{producto.nombre}</td>
                      <td className="py-4 px-4">{producto.descripcion}</td>
                      <td className="py-4 px-4">{producto.precio}</td>
                      <td className="py-4 px-4">
                        <input
                          type="number"
                          value={producto.cantidad || 1}
                          min="1"
                          className="w-20 p-2 border rounded"
                          onChange={(e) =>
                            actualizarCantidad(index, e.target.value)
                          }
                        />
                      </td>
                      <td className="py-4 px-4">
                        S/{" "}
                        {(
                          parseFloat(producto.precio.replace("S/ ", "")) *
                          (producto.cantidad || 1)
                        ).toFixed(2)}
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => eliminarProducto(index)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <aside className="lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Resumen</h2>
            <p className="mb-4">Estimar envío e impuestos</p>
            <div className="mb-4">
              <label htmlFor="pais" className="block mb-2">
                País
              </label>
              <select id="pais" className="w-full p-2 border rounded">
                <option value="Zimbabue">Zimbabue</option>
                {/* Otros países */}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="provincia" className="block mb-2">
                Estado/Provincia
              </label>
              <input
                type="text"
                id="provincia"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="codigo-postal" className="block mb-2">
                Código Postal
              </label>
              <input
                type="text"
                id="codigo-postal"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="recoger-tienda"
                defaultChecked
                className="mr-2"
              />
              <label htmlFor="recoger-tienda">
                Recoger en tienda: 529 C. Juan Manuel Polar
              </label>
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Total: <span id="total">S/ {totalCarrito.toFixed(2)}</span>
            </h3>
            <button
              onClick={comprar}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Comprar
            </button>
          </aside>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={continuarComprando}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Continuar comprando
          </button>
          <button
            onClick={borrarCarrito}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition duration-300"
          >
            Borrar carrito
          </button>
        </div>
      </main>
    </div>
  );
};

export default CarritoCompras;
