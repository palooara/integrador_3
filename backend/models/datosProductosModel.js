const mongoose = require('mongoose');

// Definimos el esquema para los datos de productos
productoSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },

    precio: {
        type: Number,
        required: true
    },

    categoria: {
        type: String,
        required: true
    },  

    descripcion: {
        type: String,
        required: true
    }

});

const datosProducto = mongoose.model("productos", productoSchema);

module.exports = datosProducto;