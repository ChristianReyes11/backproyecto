const express = require('express');
const router = express.Router();
const {createPuerta, getPuertaById, deletePuerta, getPuertas, updatePuerta} = require('../controllers/puertaController');

// Ruta GET para obtener todas las puertas
router.get('/', getPuertas);

// Ruta GET para obtener una puerta por su ID
router.get('/:id', getPuertaById);

// Ruta POST para crear una nueva puerta
router.post('/', createPuerta);

// Ruta PUT para actualizar una puerta por su ID
router.put('/:id', updatePuerta);

// Ruta DELETE para eliminar una puerta por su ID
router.delete('/:id', deletePuerta);

module.exports = router;


/**
const express = require('express');
const router = express.Router();
const puertaController = require('../controllers/puertaController');

// Ruta para obtener todas las puertas
router.get('/puertas', puertaController.obtenerTodasLasPuertas);

// Ruta para crear una nueva puerta
router.post('/puertas', puertaController.crearPuerta);

// Ruta para obtener una puerta por su ID
router.get('/puertas/:id', puertaController.obtenerPuertaPorId);

// Ruta para actualizar una puerta
router.put('/puertas/:id', puertaController.actualizarPuerta);

// Ruta para eliminar una puerta
router.delete('/puertas/:id', puertaController.eliminarPuerta);

module.exports = router;
 */