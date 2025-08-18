//Configuramos nuestro servidor
//1. Librerías
const express = require('express'); 
const morgan = require('morgan');
const path = require('path'); 
const MongoStore = require('connect-mongo');
const cors = require('cors');
require('dotenv').config(); 
const session = require('express-session');

//2.Creamos el servidor
const app = express(); 

//3. Middlewares
app.use(cors({
  origin: 'https://integrador-3-rose.vercel.app', // frontend en Vercel
  credentials: true, 
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 día
      httpOnly: true,
      secure: false, // en producción HTTPS = true
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 14 * 24 * 60 * 60, // 14 días
    }),
  })
);

// Middleware para pasar datos de sesión a las vistas (si usas Handlebars/EJS)
app.use((req, res, next) => {
  res.locals.usuarioLogueado = req.session.usuarioId || null;
  res.locals.nombreUsuario = req.session.nombreUsuario || null;
  next();
});

//4. Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//5. Importamos las rutas
const apiRouter = require('./routes/datosProductosRouter');
const authRouter = require('./routes/authRouter');
const pagesRouter = require('./routes/pagesRouter');

//6. Usamos las rutas
app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/', pagesRouter);

//7. Errores 404 y 500
app.use((req, res) =>{
    console.log('Ruta no encontrada:' + req.url);
    res.status(404).send('<h1>404 - Página no encontrada</h1>');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('<h1>500 - Error interno del servidor</h1>');
});

//Exportamos el servidor
module.exports = app;
