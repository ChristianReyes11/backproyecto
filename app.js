const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json())
// Configuración de la conexión a la base de datos mongodb+srv://chrisreyes:admin@cluster0.an5fnzd.mongodb.net/API_CBIX?retryWrites=true&w=majority
// Mongo Atlas: mongodb+srv://chrisreyes:admin@cluster0.an5fnzd.mongodb.net/API_CBIX?retryWrites=true&w=majority
// Mongo Local en Docker: mongodb://localhost:27017/API_CBIX
mongoose.connect('mongodb+srv://chrisreyes:admin@cluster0.an5fnzd.mongodb.net/API_CBIX?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    // Aquí puedes iniciar tu servidor o realizar otras configuraciones
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
    app.get("/", (req, res) => {
      res.send("**Bienvenido al API de CBIX**");
    });
  })
  .catch((error) => {
    console.log('Error al conectar a la base de datos:', error);
  });

// Rutas de las Puertas
const puertaRoutes = require('./Api/routes/puertaRoutes');
app.use('/puertas', puertaRoutes);
// Rutas de las Luces
const luzRoutes = require('./Api/routes/luzRoutes');
app.use('/luces', luzRoutes);
// Rutas de los Usuarios
const usuarioRoutes = require('./Api/routes/usuarioRoutes');
app.use('/usuarios', usuarioRoutes);