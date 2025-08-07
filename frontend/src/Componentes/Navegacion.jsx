import React, { useEffect, useState } from 'react';
import logo from './images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navegacion = () => {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const navigate = useNavigate();

  // Al montar el componente, leemos el usuario desde localStorage
  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      setUsuarioLogueado(usuario);
    }
  }, []);

  // Función para cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    setUsuarioLogueado(null);
    navigate('/login');
  };

  return (
    <React.Fragment>
      <nav className="py-2" style={{ backgroundColor: '#ff6ac6', marginBottom: '10px' }}>
        <div className="container">
          <div className="row align-items-center">

            {/* Columna izquierda */}
            <div className="col d-flex gap-4">
              {usuarioLogueado ? (
                <>
                
                  <button className="btn btn-link nav-link text-white pt-1" onClick={cerrarSesion}>
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <Link className="nav-link text-white pt-1" to="/login">Iniciar sesión</Link>
              )}
              <Link className="nav-link text-white pt-1" to="/nosotros">Nosotros</Link>
              <Link className="nav-link text-white pt-1" to="/alta">Alta</Link>
            </div>

            {/* Columna central con logo centrado */}
            <div className="col text-center">
              <Link className="nav-link d-inline-block" to="/">
                <img src={logo} alt="Logo" style={{ width: '60px', height: '70px' }} />
              </Link>
            </div>

            {/* Columna derecha */}
            <div className="col d-flex justify-content-end align-items-center gap-3">
              <button id="btnCarrito" className="btn btn-outline-light">
                <i className="bi bi-cart-fill"></i>
              </button>
            </div>

          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navegacion;
