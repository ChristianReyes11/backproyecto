const { check, validationResult } = require('express-validator');

const luzValidator = [
  check('nombre').notEmpty().withMessage('El nombre de la luz es requerido.'),
  check('estado').isBoolean().withMessage('El estado debe ser un valor booleano.'),
  check('brillo').isInt({ min: 0, max: 100 }).withMessage('El brillo debe ser un valor entre 0 y 100.'),
  check('programar').optional().isDate().withMessage('El valor de programar debe ser una fecha válida.'),
  check('color').optional().isString().matches(/^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/i).withMessage('El formato del color es inválido.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = luzValidator;

