const express = require('express');
const router = express.Router();
const { crearUsuario, obtenerUsuarios, obtenerUsuarioPorId, iniciarSesion, deleteUser} = require('../controllers/usuarioController');

// Endpoint para crear un usuario
router.post('/', crearUsuario);

// Endpoint para obtener todos los usuarios
router.get('/', obtenerUsuarios);

// Endpoint para obtener un usuario por su ID
router.get('/:id', obtenerUsuarioPorId);

// Endpoint para iniciar sesión
router.post('/login', iniciarSesion);

// Endpoint para Eliminar usuario por su ID
router.delete('/:id', deleteUser);

module.exports = router;
