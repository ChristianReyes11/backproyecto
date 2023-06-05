// En un archivo llamado "puerta.js" dentro de la carpeta "models"

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Asegúrate de que la ruta al archivo de configuración de la base de datos sea correcta

const Puerta = sequelize.define('Puerta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  // Otros campos de la entidad puerta
});

module.exports = Puerta;
