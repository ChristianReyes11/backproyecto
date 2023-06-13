// En un archivo llamado "puerta.js" dentro de la carpeta "models"
const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const puertaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    enum: ['abierto', 'cerrado'],
    default: 'cerrado'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {Timestamp: true});

const Puerta = mongoose.model('Puerta', puertaSchema);

module.exports = Puerta;



/**
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
 */