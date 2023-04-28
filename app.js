const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./Api/config/db');
const routes = require('./Api/routes/luzRoutes');

const app = express();

// Configuración del body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * route homepage
 */
app.get("/", (req, res) => {
  res.send("**Bienvenido a CBIX**");
});

// Conexión a la base de datos
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Conexión establecida correctamente.');
//   })
//   .catch((error) => {
//     console.log('No se pudo establecer la conexión con la base de datos:', error);
//   });

// Carga de rutas de la API
app.use('/api', routes);

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000.');
});

