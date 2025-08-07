const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
  productos: [
    {
      nombre: String,
      precio: Number,
      descripcion: String
    }
  ],
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});
const Carrito = mongoose.model('Carrito', carritoSchema);
module.exports = Carrito;