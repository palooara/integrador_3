const mongoose =  require('mongoose');

const connectDB = async (MONGO_URI) => {
    try {
       await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
       });
       console.log("Conectado a la base de datos: integradorii ");
    } catch (error) {
       console.error("Error al conectar a la base de datos", error);
       process.exit(1);
    }
}

module.exports = connectDB;