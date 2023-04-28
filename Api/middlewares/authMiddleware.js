const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const usuario = await Usuario.findOne({
      where: { id: decoded.id },
    });

    if (!usuario) {
      throw new Error();
    }

    req.usuario = usuario;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).json({
      message: 'No autorizado',
    });
  }
};

module.exports = authMiddleware;
