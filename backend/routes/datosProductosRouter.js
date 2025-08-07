const router =  require('express').Router();

// rutas para api/productos
// Aquí se manejan las operaciones de productos

const { envioProductos,
        eliminarProducto,
        editarProducto,
        traerProductos

 } = require('../controllers/controllerDatosProductos');

 router.post('/productos', envioProductos);
 router.get('/productos', traerProductos);
 router.delete('/productos/:id', eliminarProducto );
 router.put('/productos/:id', editarProducto);
 

// Rutas para api/carrito
// Aquí se manejan las operaciones del carrito de compras

 const {
     agregarCarrito,
     mostrarCarrito
 } = require('../controllers/carritoController');

router.get('/carrito', mostrarCarrito);  // GET /carrito
router.post('/carrito', agregarCarrito); // Agregar producto

module.exports = router;


