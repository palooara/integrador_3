import './index.css';
import { useState, useEffect } from "react";
import api from './axiosConfig';
import { Routes, Route } from 'react-router-dom';
import Navegacion from './Componentes/Navegacion';
import Footer from './Componentes/Footer';
import Home from './Componentes/Home';
import Nosotros from './Componentes/Nosotros';
import Alta from './Componentes/Alta';
import Login from './Componentes/Login';
import Productos from './Componentes/Productos';
import Registro from './Componentes/Registro';

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(localStorage.getItem("usuario"));
  const [rol, setRol] = useState(localStorage.getItem("role"));

  useEffect(() => {
  api.get("/auth/me")
    .then(res => {
      setUsuario(res.data.nombre);
      setRol(res.data.role);
      localStorage.setItem("usuario", res.data.nombre);
      localStorage.setItem("role", res.data.role);
    })
    .catch(() => {
      setUsuario(null);
      setRol(null);
      localStorage.removeItem("usuario");
      localStorage.removeItem("role");
    });
}, []);

  const agregarProducto = (nuevoProducto) => {
    setProductos(prev => [...prev, nuevoProducto]);
  };

  return (
    <>
      <Navegacion
        carrito={carrito}
        setCarrito={setCarrito}
        usuario={usuario}
        setUsuario={setUsuario}
        rol={rol}
        setRol={setRol}
      />
      <main style={{ flex: 1 }} className="container my-4">
        <Routes>
          <Route path="/" element={<Home productos={productos} carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="/alta" element={<Alta onNuevoProducto={agregarProducto} />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/login" element={<Login setUsuario={setUsuario} setRol={setRol} />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;