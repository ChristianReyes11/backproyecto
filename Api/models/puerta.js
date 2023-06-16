// En un archivo llamado "puerta.js" dentro de la carpeta "models"
const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const puertaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  estado: {
    type: Boolean,
    required: true,
    default: false
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