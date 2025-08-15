import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setUsuario, setRol }) => {
    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState("");
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            setMensaje('Por favor, completá todos los campos.');
            return;
        }
        try {
            const res = await axios.post('http://localhost:3000/auth/login', form, { withCredentials: true });
            localStorage.setItem("usuario", res.data.nombre);
            localStorage.setItem("role", res.data.role);
            setUsuario(res.data.nombre);
            setRol(res.data.role);
            setMensaje('✅ Usuario logueado correctamente.');
            setForm({ email: '', password: '' });
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            if (err.response?.data?.errores) setMensaje(err.response.data.errores);
            else setMensaje(["Error desconocido"]);
        }
    };

    return (
        <main className="container my-5">
            {mensaje && (
                <div className="alert alert-danger">
                    {Array.isArray(mensaje) ? <ul>{mensaje.map((err, i) => <li key={i}>{err}</li>)}</ul> : <p>{mensaje}</p>}
                </div>
            )}
            <form onSubmit={handleSubmit} className="w-50 mx-auto">
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña:</label>
                    <input type="password" name="password" className="form-control" value={form.password} onChange={handleChange} required />
                </div>
                <button className="btn btn-primary" type="submit">Iniciar sesión</button>
                <p className="mt-3">¿No tienes una cuenta? <Link to="/registro">registrate</Link></p>
            </form>
        </main>
    );
};

export default Login;
