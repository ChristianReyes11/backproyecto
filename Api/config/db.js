const mongoose = require('mongoose');

// URL de conexión proporcionada por MongoDB Atlas
const uri = 'mongodb+srv://chrisreyes:admin@cluster0.an5fnzd.mongodb.net/Api_CBIX?retryWrites=true&w=majority';

// Configurar la conexión a la base de datos
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

/** 
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cbix', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = {
  sequelize
};
*/