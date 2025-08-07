//Configuramos nuestro servidor
//1. Librerías

const express = require('express'); //framework para crear servidores
const morgan = require('morgan');// middleware para registrar las peticiones HTTP
const path = require('path'); //librería para trabajar con rutas
const MongoStore = require('connect-mongo');
const cors = require('cors');
require('dotenv').config(); 
const session = require('express-session');


//2.Creamos el servidor
const app = express(); 



//3.Aplicamos los middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, 
}));

app.use(morgan('dev')); //registrar las peticiones HTTP en la consola
app.use(express.json()); //parsear el cuerpo de las peticiones a JSON

app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_LOCAL,
    ttl: 60 * 60 * 24 // sesión dura 1 día (en segundos)
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // cookie también dura 1 día
  }
}));

app.use((req, res, next) => {
  res.locals.usuarioLogueado = req.session.usuarioId || null;
  res.locals.nombreUsuario = req.session.nombreUsuario || null;
  next();
});

app.use(express.urlencoded({ extended: true })); //parsear el cuerpo de las peticiones a URL-encoded

app.use(express.static(path.join(__dirname, 'public'))); //servir archivos estáticos desde la carpeta public


// 6. Importamos las rutas
const apiRouter = require('./routes/datosProductosRouter'); //rutas de la API
const authRouter = require('./routes/authRouter'); //rutas de autenticación
const pagesRouter = require('./routes/pagesRouter');// rutas a las páginas

//7. Usamos las rutas
app.use('/api', apiRouter); //rutas de la API
app.use('/auth', authRouter); //rutas de autenticación
app.use('/', pagesRouter); // rutas a las páginas

//8. Middleware para manejar errores 404 y 500
// Middleware para manejar rutas no encontradas
app.use((req, res) =>{
    console.log('Ruta no encontrada:' + req.url);
    res.status(404).send('<h1>404-Página no encontrada</h1>');
});


// Middleware para manejar errores internos del servidor
app.use((err, req, res, next) => {
    console.error( err.stack);
    res.status(500).send('<h1>500-Error interno del servidor</h1>');
});

//Exportamos el servidor
module.exports = app;