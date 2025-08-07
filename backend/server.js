const dotenv = require('dotenv');
dotenv.config();

//importamos la config del servidor
const app = require('./app');

//Importamos la conexión a la base de datos
const connectDB = require('./conexion/conecctionMongo');

//Importamos el puerto del archivo .env
const PORT = process.env.PORT || 4000;

//Importamos la URL de conexión a la base de datos de atlas
//const MONGO_URI = process.env.MONGO_ATLAS;

//Importamos la URL de conexión a la base de datos local
const MONGO_URI = process.env.MONGO_LOCAL;



connectDB(MONGO_URI);

app.listen(PORT,() => {
     console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
    //console.log(`Servidor escuchando en el puerto ${PORT}`);
});