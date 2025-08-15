import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Alta = ({ onNuevoProducto }) => {
  const [form, setForm] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    descripcion: ''
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.precio || !form.categoria || !form.descripcion) {
      setMensaje('Por favor, completá todos los campos.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/api/productos', form);
      setMensaje('✅ Producto creado correctamente.');
      onNuevoProducto(res.data.producto); // Agregar al home
      setForm({ nombre: '', precio: '', categoria: '', descripcion: '' });
    } catch (err) {
      console.error(err);
      setMensaje('❌ Error al crear el producto.');
    }
  };

  return (
    <div className="mb-5">
      <h1>Alta de Producto</h1>
      {mensaje && <div className="alert alert-danger">{mensaje}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Categoría</label>
          <input
            type="text"
            className="form-control"
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label ">Descripción</label>
          <input
            type="text"
            className="form-control"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-flex justify-content-between pt-3">

          <button type="submit" className="btn btn-primary">Agregar Producto</button>

          <Link className="" to="/productos">Lista de productos</Link>
        </div>
      </form>
    </div>
  );
};

export default Alta;
