const express = require('express');
const router = express.Router();
const luzController = require('../controllers/luzController');

// Ruta para obtener todas las luces
router.get('/luces', luzController.getLuces);

// Ruta para obtener una luz por su ID
router.get('/luces/:id', luzController.getLuzById);

// Ruta para crear una nueva luz
router.post('/luces', luzController.createLuz);

// Ruta para actualizar una luz existente
router.put('/luces/:id', luzController.updateLuz);

// Ruta para eliminar una luz existente
router.delete('/luces/:id', luzController.deleteLuz);

module.exports = router;

