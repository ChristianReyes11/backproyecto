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
