const express = require('express');
const router = express.Router();
const {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  iniciarSesion,
} = require('../controllers/usuariosController');

// Endpoint para crear un usuario
router.post('usuario', crearUsuario);

// Endpoint para obtener todos los usuarios
router.get('/usuarios', obtenerUsuarios);

// Endpoint para obtener un usuario por su ID
router.get('/usuarios/:id', obtenerUsuarioPorId);

// Endpoint para iniciar sesión
router.post('/usuarios/login', iniciarSesion);

module.exports = router;
