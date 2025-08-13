import { useEffect, useState } from 'react';
import logo from './images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navegacion = ({ carrito, setCarrito }) => {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    if (usuario) setUsuarioLogueado(usuario);
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    setUsuarioLogueado(null);
    navigate('/login');
  };

  const abrirModalCarrito = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  const eliminarProducto = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  const agregarTurno = async () => {
    if (carrito.length === 0) return;
    setGuardando(true);
    try {
      await axios.post(
        "http://localhost:3000/carrito/agregar",
        { productos: carrito },
        { withCredentials: true }
      );
      alert("Turno agregado y carrito guardado!");
      setCarrito([]);
      cerrarModal();
    } catch (err) {
      console.error("Error al guardar carrito:", err);
      alert("Error al guardar el turno");
    } finally {
      setGuardando(false);
    }
  };

  const productosAgrupados = carrito.reduce((acc, prod) => {
    if (!acc[prod.nombre]) acc[prod.nombre] = { ...prod, cantidad: 1 };
    else acc[prod.nombre].cantidad += 1;
    return acc;
  }, {});

  const total = carrito.reduce((sum, p) => sum + p.precio, 0);

  return (
    <>
<nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#ff6ac6', padding: '10px' }}>
  <div className="container-fluid">

    {/* FILA SUPERIOR (móvil): ☰  Logo  🛒 */}
    <div className="d-flex w-100 align-items-center justify-content-between d-lg-none">
      {/* Toggler (móvil) */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mobileMenu"
        aria-controls="mobileMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Logo móvil */}
      <Link className="navbar-brand" to="/">
        <img className="logo-navbar" src={logo} alt="Logo" />
      </Link>

      {/* Carrito */}
      <button className="btn btn-outline-light position-relative" onClick={abrirModalCarrito}>
        <i className="bi bi-cart-fill"></i>
        <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
          {carrito.length}
        </span>
      </button>
    </div>

    {/* FILA ESCRITORIO: Links — Logo — Carrito */}
    <div className="d-none d-lg-flex w-100 align-items-center position-relative p-3">
      {/* Links (izquierda) */}
      <ul className="navbar-nav">
        {usuarioLogueado ? (
          <li className="nav-item">
            <button className="btn btn-link nav-link text-white" onClick={cerrarSesion}>Cerrar sesión</button>
          </li>
        ) : (
          <li className="nav-item">
            <Link className="nav-link text-white" to="/login">Iniciar sesión</Link>
          </li>
        )}
        <li className="nav-item">
          <Link className="nav-link text-white" to="/nosotros">Nosotros</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/alta">Alta</Link>
        </li>
      </ul>

      {/* Logo centrado absoluto */}
      <div className="position-absolute start-50 translate-middle-x">
        <Link className="navbar-brand" to="/">
          <img className="logo-navbar" src={logo} alt="Logo" />
        </Link>
      </div>

      {/* Carrito (derecha) */}
      <div className="ms-auto">
        <button className="btn btn-outline-light position-relative" onClick={abrirModalCarrito}>
          <i className="bi bi-cart-fill"></i>
          <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
            {carrito.length}
          </span>
        </button>
      </div>
    </div>

    {/* MENÚ COLAPSABLE SOLO MÓVIL */}
    <div id="mobileMenu" className="collapse d-lg-none mt-2">
      <ul className="navbar-nav text-center">
        {usuarioLogueado ? (
          <li className="nav-item">
            <button className="btn btn-link nav-link text-white" onClick={cerrarSesion}>Cerrar sesión</button>
          </li>
        ) : (
          <li className="nav-item">
            <Link className="nav-link text-white" to="/login">Iniciar sesión</Link>
          </li>
        )}
        <li className="nav-item">
          <Link className="nav-link text-white" to="/nosotros">Nosotros</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/alta">Alta</Link>
        </li>
      </ul>
    </div>

  </div>
</nav>





      {/* Modal Carrito */}
      {modalAbierto && (
        <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Carrito</h5>
                <button className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                {carrito.length === 0 ? (
                  <p>No hay productos en el carrito.</p>
                ) : (
                  Object.values(productosAgrupados).map((prod, i) => (
                    <div key={i} className="d-flex justify-content-between align-items-center border-bottom py-2 flex-wrap">
                      <span>{prod.nombre} {prod.cantidad > 1 && `(x${prod.cantidad})`} - ${prod.precio.toFixed(2)}</span>
                      <button
                        className="btn btn-sm btn-danger mt-1 mt-md-0"
                        onClick={() => {
                          const index = carrito.findIndex((p) => p._id === prod._id);
                          eliminarProducto(index);
                        }}
                      >
                        X
                      </button>
                    </div>
                  ))
                )}
              </div>
              <div className="modal-footer d-flex flex-column align-items-start">
                <h6>Total: ${total.toFixed(2)}</h6>
                <div className="d-flex w-100 justify-content-between mt-2 flex-wrap">
                  <button className="btn btn-secondary mb-2 mb-md-0" onClick={cerrarModal}>Cerrar</button>
                  <button className="btn btn-primary" onClick={agregarTurno} disabled={carrito.length === 0 || guardando}>
                    {guardando ? "Guardando..." : "Agregar Turno"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navegacion;
