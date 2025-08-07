import { useEffect, useState } from "react";
import axios from "axios";

const Productos = () => {
  const [productos, setProductos] = useState([]);

  const traerProductos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/productos");
      setProductos(res.data.productos);
    } catch (error) {
      console.error("Error al traer productos", error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/productos/${id}`);
      traerProductos(); // recargar lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar producto", error);
    }
  };

  const editarProducto = (id) => {
    alert(`Función editar pendiente para producto con ID: ${id}`);
    // Podés redirigir a otra ruta o abrir un modal para editar
  };

  useEffect(() => {
    traerProductos();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Productos</h2>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No hay productos para mostrar.
              </td>
            </tr>
          ) : (
            productos.map((prod) => (
              <tr key={prod._id}>
                <td>{prod.nombre}</td>
                <td>{prod.descripcion}</td>
                <td>${prod.precio}</td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => editarProducto(prod._id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => eliminarProducto(prod._id)}
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
  );
};

export default Productos;
