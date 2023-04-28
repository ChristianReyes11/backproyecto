const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, contrasena } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena, salt);

    const usuario = await Usuario.create({
      nombre,
      correo,
      contrasena: hashedPassword,
    });

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET);

    res.status(201).json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al crear el usuario',
    });
  }
};

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ['contrasena'] },
    });

    res.status(200).json({ usuarios });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al obtener los usuarios',
    });
  }
};

const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findOne({
      where: { id },
      attributes: { exclude: ['contrasena'] },
    });

    if (!usuario) {
      return res.status(404).json({
        message: 'Usuario no encontrado',
      });
    }

    res.status(200).json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al obtener el usuario',
    });
  }
};

const iniciarSesion = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    const usuario = await Usuario.findOne({
      where: { correo },
    });

    if (!usuario) {
      return res.status(400).json({
        message: 'Credenciales incorrectas',
      });
    }

    const contrasenaValida = await bcrypt.compare(
      contrasena,
      usuario.contrasena
    );

    if (!contrasenaValida) {
      return res.status(400).json({
        message: 'Credenciales incorrectas',
      });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET);

    res.status(200).json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al iniciar sesión',
    });
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  iniciarSesion,
};