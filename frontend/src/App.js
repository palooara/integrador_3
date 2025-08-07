import './index.css';
import { useState, useEffect } from "react";
import axios from "axios";
import {Routes, Route}  from 'react-router-dom';
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
  const [logueado, setLogueado] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/api/productos', { withCredentials: true })
      .then(res => {
        setProductos(res.data.productos);
        setLogueado(res.data.usuarioLogueado);
      })
      .catch(err => console.error(err));
  }, []);

  // Agrega un nuevo producto al estado actual sin recargar
  const agregarProducto = (nuevoProducto) => {
    setProductos(prev => [...prev, nuevoProducto]);
  };

  return (
    <>
      <Navegacion />
      <main style={{ flex: 1 }} className="container my-4">

        

        <Routes>
          <Route path="/" element={<Home productos={productos} />} />
          <Route path="/alta" element={<Alta onNuevoProducto={agregarProducto} />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productos" element= {<Productos />} />
          <Route path="/registro" element= {<Registro />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}


export default App;
