const Usuario = require('../models/usuario');

// Controlador para crear un nuevo usuario
const crearUsuario = async (req, res) => {
  try {
    // Obtener los datos del usuario del cuerpo de la solicitud
    const { nombre, correo, contraseña } = req.body;

    // Verificar si el correo electrónico ya está registrado
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }

    // Crear una instancia del modelo Usuario con los datos proporcionados
    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      contraseña,
    });

    // Guardar el nuevo usuario en la base de datos
    await nuevoUsuario.save();

    // Enviar la respuesta con el usuario creado
    res.status(201).json({ usuario: nuevoUsuario });
  } catch (error) {
    // Manejo de errores
    console.error(error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

// Controlador para obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    // Obtener todos los usuarios de la base de datos
    const usuarios = await Usuario.find();

    // Enviar la respuesta con los usuarios encontrados
    res.status(200).json({ usuarios });
  } catch (error) {
    // Manejo de errores
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Controlador para obtener un usuario por su ID
const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el usuario por su ID en la base de datos
    const usuario = await Usuario.findById(id);

    // Verificar si se encontró un usuario con el ID proporcionado
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Enviar la respuesta con el usuario encontrado
    res.status(200).json({ usuario });
  } catch (error) {
    // Manejo de errores
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

// Controlador para iniciar sesión de un usuario
const iniciarSesion = async (req, res) => {
  try {
    // Obtener los datos de inicio de sesión del cuerpo de la solicitud
    const { correo, contraseña } = req.body;

    // Buscar el usuario por su correo electrónico en la base de datos
    const usuario = await Usuario.findOne({ correo });

    // Verificar si se encontró un usuario con el correo electrónico proporcionado
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar si la contraseña es correcta
    if (usuario.contraseña !== contraseña) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Enviar la respuesta con el usuario autenticado
    res.status(200).json({ usuario });
  } catch (error) {
    // Manejo de errores
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  iniciarSesion
};
