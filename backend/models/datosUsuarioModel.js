const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    telefono: { type: String, required: true },
    rol: { type: String, enum: ['usuario', 'admin'], default: 'usuario' },
    fechaCreacion: { type: Date, default: Date.now }
});

// Encripta la contraseña antes de guardar
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Método para validar contraseña
usuarioSchema.methods.validarPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;