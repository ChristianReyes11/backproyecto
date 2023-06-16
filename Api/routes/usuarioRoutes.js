const express = require('express');
const router = express.Router();
const { crearUsuario, obtenerUsuarios, obtenerUsuarioPorId, iniciarSesion, } = require('../controllers/usuarioController');

// Endpoint para crear un usuario
router.post('/', crearUsuario);

// Endpoint para obtener todos los usuarios
router.get('/', obtenerUsuarios);

// Endpoint para obtener un usuario por su ID
router.get('/:id', obtenerUsuarioPorId);

// Endpoint para iniciar sesión
router.post('/login', iniciarSesion);

module.exports = router;
