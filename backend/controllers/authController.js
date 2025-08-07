const Usuario = require("../models/datosUsuarioModel");
//validaciones con joi
const Joi = require("joi"); //importamos joi para validaciones
const env = require("dotenv").config(); //cargamos las variables de entorno
//Enviar email de bienvenida
const nodemailer = require("nodemailer");

const registrar = async (req, res) => {
  const { email, password, nombre, telefono } = req.body;

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

    const nuevoUsuario = new Usuario({ email, password, nombre, telefono });
    await nuevoUsuario.save();

    // enviar email de bienvenida
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

    // Redirigir al usuario a la página de inicio o enviar una respuesta
    req.session.usuarioId = nuevoUsuario._id;
    req.session.nombreUsuario = nuevoUsuario.nombre;
    req.session.emailUsuario = nuevoUsuario.email;
    req.session.telefonoUsuario = nuevoUsuario.telefono;
    req.session.save();
    res.cookie("usuarioId", nuevoUsuario._id, { httpOnly: true });
    res.cookie("nombreUsuario", nuevoUsuario.nombre, { httpOnly: true });
    res.cookie("emailUsuario", nuevoUsuario.email, { httpOnly: true });
    res.cookie("telefonoUsuario", nuevoUsuario.telefono, { httpOnly: true });
    // Enviar respuesta de éxito
    res.status(201).json({ mensaje: "Usuario registrado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errores: ["Error al registrar usuario"] });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

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

    const { error } = loginSchema.validate(
      { email, password },
      { abortEarly: false }
    );

     if (error) {
    const mensajes = error.details.map((e) => e.message);
    return res.status(400).json({ errores: mensajes });
  }

    if (!usuario) {
      return res.status(400).json({ errores: ["El usuario no existe"] });
    }

    const valido = await usuario.validarPassword(password);

    if (!valido) {
      return res.status(400).json({ errores: ["Contraseña incorrecta"] });
    }

    req.session.usuarioId = usuario._id;
    req.session.nombreUsuario = usuario.nombre;

    return res.status(200).json({
  mensaje: "Login correcto",
  nombreUsuario: usuario.nombre
});

  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).render("login", { error: "Error interno en el login" });
  }
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

module.exports = {
  registrar,
  login,
  logout,
};
