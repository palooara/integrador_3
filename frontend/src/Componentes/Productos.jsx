import React, { useEffect, useState } from "react";
import api from "../axiosConfig";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoEditando, setProductoEditando] = useState({
    _id: "",
    nombre: "",
    precio: "",
    descripcion: ""
  });

  useEffect(() => {
    traerProductos();
  }, []);

  const traerProductos = async () => {
    try {
      const res = await api.get("/api/productos");
      if (Array.isArray(res.data)) {
        setProductos(res.data);
      } else if (Array.isArray(res.data.productos)) {
        setProductos(res.data.productos);
      } else {
        setProductos([]);
      }
    } catch (error) {
      console.error("Error al traer productos", error);
      setProductos([]);
    }
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este producto?")) return;
    try {
      await api.delete(`/api/productos/${id}`);
      setMensaje("Producto eliminado ✅");
      setProductos(productos.filter((prod) => prod._id !== id));
    } catch (error) {
      console.error("Error al eliminar producto", error);
      setMensaje("❌ Error al eliminar");
    }
  };

  const abrirModalEditar = (producto) => {
    setProductoEditando(producto);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setProductoEditando({ _id: "", nombre: "", precio: "", descripcion: "" });
  };

  const handleChange = (e) => {
    setProductoEditando({
      ...productoEditando,
      [e.target.name]: e.target.value,
    });
  };

  const guardarCambios = async () => {
    try {
      await api.put(
        `/api/productos/${productoEditando._id}`,
        {
          nombre: productoEditando.nombre,
          descripcion: productoEditando.descripcion,
          precio: productoEditando.precio,
        }
      );
      setMensaje("Producto actualizado ✅");
      setProductos((prev) =>
        prev.map((p) =>
          p._id === productoEditando._id ? productoEditando : p
        )
      );
      cerrarModal();
    } catch (error) {
      console.error("Error al actualizar producto", error);
      setMensaje("❌ Error al actualizar");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Productos</h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}

      {productos.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto._id}>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>${producto.precio}</td>
                <td>
                  <button
                    onClick={() => eliminarProducto(producto._id)}
                    className="btn btn-danger btn-sm me-2"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => abrirModalEditar(producto)}
                    className="btn btn-warning btn-sm"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay productos cargados.</p>
      )}

      {/* Modal */}
      {modalAbierto && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Producto</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cerrarModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={productoEditando.nombre}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label>Descripcion</label>
                  <input
                    type="text"
                    className="form-control"
                    name="descripcion"
                    value={productoEditando.descripcion}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label>Precio</label>
                  <input
                    type="number"
                    className="form-control"
                    name="precio"
                    value={productoEditando.precio}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={cerrarModal}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-primary"
                  onClick={guardarCambios}
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productos;
