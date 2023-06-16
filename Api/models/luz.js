const mongoose = require('mongoose');

const luzSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  estado: {
    type: Boolean,
    required: true,
    default: false
  },
  brillo: {
    type: Number,
    required: true
  },
  programar: {
    type: Date,
    default: null
  },
  color: {
    type: String,
  }
});

const Luz = mongoose.model('Luz', luzSchema);

module.exports = Luz;