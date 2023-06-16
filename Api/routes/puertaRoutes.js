const express = require('express');
const router = express.Router();
const {createPuerta, getPuertaById, deletePuerta, getPuertas, updatePuerta, abrirPuerta, cerrarPuerta} = require('../controllers/puertaController');

// Ruta para abrir y cerrar puerta
router.post('/abrir/:id', abrirPuerta);
router.post('/cerrar/:id', cerrarPuerta);

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