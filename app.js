const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(express.json())
// Configuración de la conexión a la base de datos
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

// Configuración de rutas, middleware y otras configuraciones de tu API
// ...

// Rutas de las puertas
const puertaRoutes = require('./Api/routes/puertaRoutes');
app.use('/puertas', puertaRoutes);

const luzRoutes = require('./Api/routes/luzRoutes');
app.use('/luces', luzRoutes);

// Otros enrutadores y configuraciones
// ...

// Manejo de errores y otros middleware
// ...