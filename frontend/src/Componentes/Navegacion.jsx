import { useState } from 'react';
import logo from './images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import api from '../axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navegacion = ({ carrito, setCarrito, usuario, setUsuario, rol, setRol }) => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('role');
    setUsuario(null);
    setRol(null);
    navigate('/login');
  };

  const abrirModalCarrito = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  const eliminarProducto = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  const agendarTurno = async () => {
  if (!usuario) {
    alert("Debes iniciar sesión para agendar un turno.");
    return;
  }

  if (carrito.length === 0) return;

  setGuardando(true);
  try {
    await api.post(
      "/api/carrito",
      { productos: carrito },
    );
    alert("Turno agendado con éxito.");
    setCarrito([]);
    cerrarModal();
  } catch (err) {
    console.error("Error al guardar el carrito:", err);
    alert("Error al agendar el turno. Intente nuevamente.");
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

          {/* FILA MÓVIL */}
          <div className="d-flex w-100 align-items-center justify-content-between d-lg-none">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mobileMenu" aria-controls="mobileMenu" aria-expanded="false" aria-label="Toggle navigation">
              <i className="bi bi-list" style={{ fontSize: '1.2rem', color: 'white' }}></i>
            </button>

            <Link className="navbar-brand" to="/"><img className="logo-navbar" src={logo} alt="Logo" /></Link>

            <button className="btn btn-outline-light position-relative" onClick={abrirModalCarrito}>
              <i className="bi bi-cart-fill"></i>
              {carrito.length > 0 && <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">{carrito.length}</span>}
            </button>
          </div>

          {/* FILA ESCRITORIO */}
          <div className="d-none d-lg-flex w-100 align-items-center position-relative p-3">
            <ul className="navbar-nav">
              {usuario ? (
                <>
                  <li className="nav-item">
                    <button className="btn btn-link nav-link text-white" onClick={cerrarSesion}>Cerrar sesión</button>
                  </li>
                  {rol === 'admin' && (
                    <li className="nav-item">
                      <Link className="nav-link text-white" to="/alta">Alta</Link>
                    </li>
                  )}
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login">Iniciar sesión</Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link text-white" to="/nosotros">Nosotros</Link>
              </li>
            </ul>

            <div className="position-absolute start-50 translate-middle-x">
              <Link className="navbar-brand" to="/"><img className="logo-navbar" src={logo} alt="Logo" /></Link>
            </div>

            <div className="ms-auto">
              <button className="btn btn-outline-light position-relative" onClick={abrirModalCarrito}>
                <i className="bi bi-cart-fill"></i>
                {carrito.length > 0 && <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">{carrito.length}</span>}
              </button>
            </div>
          </div>

          {/* MENÚ MÓVIL */}
          <div id="mobileMenu" className="collapse d-lg-none mt-2">
            <ul className="navbar-nav text-center">
              {usuario ? (
                <>
                  <li className="nav-item">
                    <button className="btn btn-link nav-link text-white" onClick={cerrarSesion}>Cerrar sesión</button>
                  </li>
                  {rol === 'admin' && (
                    <li className="nav-item">
                      <Link className="nav-link text-white" to="/alta">Alta</Link>
                    </li>
                  )}
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login">Iniciar sesión</Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link text-white" to="/nosotros">Nosotros</Link>
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
                {carrito.length === 0 ? <p>No hay productos en el carrito.</p> :
                  Object.values(productosAgrupados).map((prod, i) => (
                    <div key={i} className="d-flex justify-content-between align-items-center border-bottom py-2 flex-wrap">
                      <span>{prod.nombre} {prod.cantidad > 1 && `(x${prod.cantidad})`} - ${prod.precio.toFixed(2)}</span>
                      <button className="btn btn-sm btn-danger mt-1 mt-md-0" onClick={() => {
                        const index = carrito.findIndex((p) => p._id === prod._id);
                        eliminarProducto(index);
                      }}>X</button>
                    </div>
                  ))
                }
              </div>
              <div className="modal-footer d-flex flex-column align-items-start">
                <h6>Total: ${total.toFixed(2)}</h6>
                <div className="d-flex w-100 justify-content-between mt-2 flex-wrap">
                  <button className="btn btn-secondary mb-2 mb-md-0" onClick={cerrarModal}>Cerrar</button>
                  <button className="btn btn-primary" onClick={agendarTurno} disabled={carrito.length === 0 || guardando}>
                    {guardando ? "Guardando..." : "Agendar Turno"}
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