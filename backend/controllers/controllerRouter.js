const datosProducto = require('../models/datosProductosModel');

const homeApp = async (req, res) => {
  try {
    const productos = await datosProducto.find();

    res.json({
      productos,
      usuarioLogueado: !!req.session?.usuarioId
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar productos' });
  }
};

module.exports = {
    homeApp,
}