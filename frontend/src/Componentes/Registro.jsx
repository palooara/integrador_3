import { React, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Registro = () => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password || !form.nombre || !form.telefono) {
      setMensaje('Por favor, completá todos los campos.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/auth/registro', form, { withCredentials: true });
      console.log(res.data);
      setMensaje('✅ Usuario registrado correctamente.');
      setForm({ email: '', password: '', nombre: '', telefono: '' });
setTimeout(() => {
    navigate('/login');
}, 1500);
    } catch (err) {
      if (err.response?.data?.errores) {
        setMensaje(err.response.data.errores);
      } else {
        setMensaje(["Error desconocido"]);
      }
    }

  };



  return (
    <>
      {mensaje && (
        <div className="alert alert-danger">
          {Array.isArray(mensaje) ? (
            <ul>
              {mensaje.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          ) : (
            <p>{mensaje}</p>
          )}
        </div>
      )}
      <main className="container my-5">
        <form
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label className="form-label">
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="form-control"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label for="telefono" className="form-label">
              Teléfono:
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              className="form-control"
              value={form.telefono}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Registrarse
          </button>
          <p className="mt-3">
            ¿Ya tenés una cuenta? <Link to="/login">Iniciar sesión</Link>
          </p>
        </form>
      </main>
    </>
  );
};

export default Registro;
