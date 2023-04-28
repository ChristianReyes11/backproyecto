const { check } = require('express-validator');

const Usuario = require('../models/usuario');

const usuarioValidator = [
  check('nombre')
    .notEmpty().withMessage('El nombre es obligatorio.')
    .isLength({ max: 100 }).withMessage('El nombre no puede tener más de 100 caracteres.'),
  check('correo')
    .notEmpty().withMessage('El correo es obligatorio.')
    .isEmail().withMessage('El correo no tiene un formato válido.')
    .custom(async (value) => {
      const usuario = await Usuario.findOne({ where: { correo: value } });
      if (usuario) {
        return Promise.reject('El correo ya está en uso.');
      }
    }),
  check('contrasena')
    .notEmpty().withMessage('La contraseña es obligatoria.')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.')
];

module.exports = usuarioValidator;
