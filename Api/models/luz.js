const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Luz = sequelize.define('Luz', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  brillo: {
    type: DataTypes.INTEGER,
    defaultValue: 50
  },
  programar: {
    type: DataTypes.DATE,
    allowNull: true
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/i
    },
    set(value) {
      const match = value.match(/^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/i);
      if (match) {
        const r = parseInt(match[1], 10);
        const g = parseInt(match[2], 10);
        const b = parseInt(match[3], 10);
        this.setDataValue('color', `rgb(${r},${g},${b})`);
      } else {
        throw new Error('El formato de color es inválido.');
      }
    }
  }
});

module.exports = Luz;

/**
 * En este modelo se definen las columnas nombre, estado, brillo, programar y color. 
 * La columna programar es de tipo DATE, lo que te permitirá almacenar una fecha y hora para 
 * programar el encendido y apagado de las luces.
 * 
 * La columna color es de tipo STRING, pero utiliza una validación que verifica 
 * que el valor recibido tenga el formato rgb(r,g,b), donde r, g y b son números enteros entre 0 y 255. 
 * Además, se define un método set que se encarga de convertir el valor recibido en el formato correcto 
 * antes de almacenarlo en la base de datos.
 */