const datosProducto = require('../models/datosProductosModel');


const envioProductos = async (req, res) => {
  const { nombre, precio, categoria, descripcion } = req.body;

  try {
    const nuevoProducto = new datosProducto({ nombre, precio, categoria, descripcion });
    await nuevoProducto.save();

    res.status(201).json({ producto: nuevoProducto }); 
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

const traerProductos = async (req, res) => {
    try {
    const productos = await datosProducto.find(); 
    res.status(200).json({productos});
  } catch (error) {
    res.status(500).send('Error al obtener productos');
  }
};

const eliminarProducto = (req, res) => {
    const id = req.params.id;
    datosProducto.findByIdAndDelete(id)
    .then(() => {
        console.log("Producto eliminado de la base de datos");
        res.status(200).send("Producto eliminado de la base de datos");
    })
    .catch(err => {
        console.error("Error al eliminar el producto", err);
        res.status(500).send("Error al eliminar el producto");
    });
};

const editarProducto = (req, res) => {

    const id = req.params.id;
    const { nombre, precio, categoria, descripcion } = req.body;
    const producto = {
        nombre,
        precio,
        categoria,
        descripcion
    };
    
    datosProducto.findByIdAndUpdate(id, producto, { new: true })
    .then((productoActualizado) => {
        if (!productoActualizado) {
            return res.status(404).send("producto no encontrado");
        }
        console.log("producto actualizado en la base de datos");
        res.status(200).send("producto actualizado en la base de datos"); // Enviar el contacto actualizado como respuesta
    })
    .catch(err => {
        console.error("Error al actualizar el producto", err);
        res.status(500).send("Error al actualizar el producto");
    });
};


module.exports = {
    envioProductos,
    eliminarProducto,
    editarProducto,
    traerProductos
};