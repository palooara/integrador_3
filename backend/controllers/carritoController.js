
const Carrito = require('../models/carritoModel');

// Controlador para agregar carrito
const agregarCarrito = async (req, res) => {
  try {
    const { productos } = req.body;
    const usuarioId = req.session.usuarioId;

    if (!usuarioId) {
      return res.status(401).json({ error: "No autenticado" });
    }


    // 2. Guardar nuevo carrito
    const nuevoCarrito = new Carrito({ productos, usuarioId });
    await nuevoCarrito.save();

    res
      .status(201)
      .json({ message: "Turno agendado y carrito actualizado", nuevoCarrito });
  } catch (error) {
    console.error("Error al guardar carrito:", error);
    res.status(500).json({ error: "Error al guardar carrito" });
  }
};



module.exports = {
    agregarCarrito
};