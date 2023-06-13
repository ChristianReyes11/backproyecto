const express = require('express');
const router = express.Router();
const {createLuz, deleteLuz, getLuces, getLuzById, updateLuz} = require('../controllers/luzController');

// Ruta para obtener todas las luces
router.get('/', getLuces);

// Ruta para obtener una luz por su ID
router.get('/:id', getLuzById);

// Ruta para crear una nueva luz
router.post('/', createLuz);

// Ruta para actualizar una luz existente
router.put('/:id', updateLuz);

// Ruta para eliminar una luz existente
router.delete('/:id', deleteLuz);

module.exports = router;

