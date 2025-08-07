
const Carrito = require('../models/carritoModel');

const mostrarCarrito = async (req, res) => {
  if (!req.session.usuarioId) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  try {
    const productosCarrito = await Carrito.find({ usuarioId: req.session.usuarioId });
    res.json(productosCarrito);
  } catch (error) {
    console.error("Error al cargar el carrito", error);
    res.status(500).json({ error: 'Error al cargar el carrito' });
  }
};

const agregarCarrito = async (req, res) => {
    try {
    const { productos } = req.body;
    const usuarioId = req.session.usuarioId; // Debe estar logueado

    if (!usuarioId) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    if (!productos || productos.length === 0) {
      return res.status(400).json({ error: 'Carrito vacío' });
    }

    const nuevoCarrito = new Carrito({
      productos,
      usuarioId
    });

    await nuevoCarrito.save();

    res.status(201).json({ message: 'Turno agendado y carrito guardado' });
  } catch (error) {
    console.error('Error al guardar carrito:', error);
    res.status(500).json({ error: 'Error al guardar carrito' });
  }
};


module.exports = {
    agregarCarrito,
    mostrarCarrito
};