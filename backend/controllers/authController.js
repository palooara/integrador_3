const Usuario = require("../models/datosUsuarioModel");
const dotenv = require('dotenv');
dotenv.config();
const Joi = require("joi");
const nodemailer = require("nodemailer");


const registrar = async (req, res) => {
  const { email, password, nombre, telefono } = req.body;

  // Validación con Joi
  const registroSchema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "El email debe ser válido",
      "string.empty": "El email es obligatorio",
    }),
    password: Joi.string().min(8).required().messages({
      "string.min": "La contraseña debe tener al menos 8 caracteres",
      "string.empty": "La contraseña es obligatoria",
    }),
    nombre: Joi.string().required().messages({
      "string.empty": "El nombre es obligatorio",
    }),
    telefono: Joi.string().required().messages({
      "string.empty": "El teléfono es obligatorio",
    }),
  });

  const { error } = registroSchema.validate(
    { email, password, nombre, telefono },
    { abortEarly: false }
  );

  if (error) {
    const mensajes = error.details.map((e) => e.message);
    return res.status(400).json({ errores: mensajes });
  }

  try {
    const existente = await Usuario.findOne({ email });
    if (existente) {
      return res.status(400).json({ errores: ["Email ya registrado"] });
    }

    // Guardar usuario
    const nuevoUsuario = new Usuario({ email, password, nombre, telefono });
    await nuevoUsuario.save();

    // Guardar en sesión automáticamente
    req.session.usuarioId = nuevoUsuario._id;
    req.session.nombreUsuario = nuevoUsuario.nombre;

    // Enviar email de bienvenida
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GOOGLE_CLIENT,
        pass: process.env.GOOGLE_SECRET,
      },
    });

    await transporter.sendMail({
      from: '"Eli Nails Salón" <paloma15@gmail.com>',
      to: email,
      subject: "Bienvenida ✔",
      html: `<h1>¡Bienvenido ${nombre} a Eli Nails Salón!</h1>
             <p>Gracias por registrarte. Estamos emocionados de tenerte con nosotros.</p>`,
    });

    return res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      nombre: nuevoUsuario.nombre,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errores: ["Error al registrar usuario"] });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  // Validación con Joi
  const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "El email debe ser válido",
      "string.empty": "El email es obligatorio",
    }),
    password: Joi.string().min(8).required().messages({
      "string.min": "La contraseña debe tener al menos 8 caracteres",
      "string.empty": "La contraseña es obligatoria",
    }),
  });

  const { error } = loginSchema.validate({ email, password }, { abortEarly: false });
  if (error) {
    const mensajes = error.details.map((e) => e.message);
    return res.status(400).json({ errores: mensajes });
  }

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ errores: ["El usuario no existe"] });
    }

    const valido = await usuario.validarPassword(password);
    if (!valido) {
      return res.status(400).json({ errores: ["Contraseña incorrecta"] });
    }

    // Guardar en sesión y forzar persistencia
    req.session.usuarioId = usuario._id;
    req.session.nombreUsuario = usuario.nombre;
    req.session.role = usuario.role;

    req.session.save(err => {
      if (err) {
        console.error("Error al guardar sesión:", err);
        return res.status(500).json({ errores: ["Error al iniciar sesión"] });
      }

      // Respuesta exitosa
      return res.status(200).json({
        mensaje: "Login correcto",
        nombre: usuario.nombre,
        role: usuario.role,
      });
    });

  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ errores: ["Error interno en el login"] });
  }
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid"); 
    res.json({ mensaje: "Sesión cerrada correctamente" });
  });
};


// const adminApp = async (req, res) =>{
//   const { clave, nombre, email, password, telefono } = req.body;


//   if (clave !== process.env.ADMIN_KEY) {
//     return res.status(403).json({ error: 'Clave de admin incorrecta' });
//   }

//   try {

//     const adminExistente = await Usuario.findOne({ email });
//     if (adminExistente) {
//       return res.status(400).json({ error: 'Usuario admin ya existe' });
//     }

//     const admin = new Usuario({
//       nombre,
//       email,
//       password,
//       telefono,
//       role: 'admin'
//     });

//     await admin.save();

//     return res.status(201).json({ mensaje: 'Usuario admin creado exitosamente', admin: { nombre, email, role: admin.role } });
//   } catch (err) {
//     console.error('Error creando admin:', err);
//     return res.status(500).json({ error: 'Error interno creando admin' });
//   }
// };

module.exports = {
  registrar,
  login,
  logout,
  //adminApp
};
