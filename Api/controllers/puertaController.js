const Puerta = require('../models/puerta');

// Obtener todas las puertas
exports.getPuertas = async (req, res) => {
  try {
    const puertas = await Puerta.find();
    res.status(200).json(puertas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las puertas' });
  }
};

// Crear una nueva puerta
exports.createPuerta = async (req, res) => {
  try {
    console.log(req.body);
    const { nombre, estado } = req.body;
    const puerta = new Puerta({ nombre, estado });
    await puerta.save();
    res.status(201).json(puerta);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al crear la puerta' });
  }
};

// Obtener una puerta por su ID
exports.getPuertaById = async (req, res) => {
  try {
    const { id } = req.params;
    const puerta = await Puerta.findById(id);
    if (!puerta) {
      return res.status(404).json({ error: 'Puerta no encontrada' });
    }
    res.status(200).json({puerta});
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener la puerta' });
  }
};

// Actualizar una puerta por su ID
exports.updatePuerta = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, estado } = req.body;
    const puerta = await Puerta.findByIdAndUpdate(
      id,
      { nombre, estado },
      { new: true }
    );
    if (!puerta) {
      return res.status(404).json({ error: 'Puerta no encontrada' });
    }
    res.status(200).json({puerta});
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al actualizar la puerta' });
  }
};

// Eliminar una puerta por su ID
exports.deletePuerta = async (req, res) => {
  try {
    const { id } = req.params;
    const puerta = await Puerta.findByIdAndDelete(id);
    if (!puerta) {
      return res.status(404).json({ error: 'Puerta no encontrada' });
    }
    res.json({ message: 'Puerta eliminada correctamente' });
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al eliminar la puerta' });
  }
};


/** 
// Importar el modelo de puerta
const Puerta = require('../models/puerta');

// Controlador para obtener todas las puertas
exports.obtenerTodasLasPuertas = async (req, res) => {
  try {
    const puertas = await Puerta.find();
    res.json(puertas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al obtener las puertas' });
  }
};

// Controlador para crear una nueva puerta
exports.crearPuerta = async (req, res) => {
  try {
    const nuevaPuerta = new Puerta(req.body);
    const puertaGuardada = await nuevaPuerta.save();
    res.json(puertaGuardada);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al crear la puerta' });
  }
};

// Controlador para obtener una puerta por su ID
exports.obtenerPuertaPorId = async (req, res) => {
  try {
    const puerta = await Puerta.findById(req.params.id);
    if (!puerta) {
      return res.status(404).json({ mensaje: 'Puerta no encontrada' });
    }
    res.json(puerta);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al obtener la puerta' });
  }
};

// Controlador para actualizar una puerta
exports.actualizarPuerta = async (req, res) => {
  try {
    const puertaActualizada = await Puerta.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!puertaActualizada) {
      return res.status(404).json({ mensaje: 'Puerta no encontrada' });
    }
    res.json(puertaActualizada);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al actualizar la puerta' });
  }
};

// Controlador para eliminar una puerta
exports.eliminarPuerta = async (req, res) => {
  try {
    const puertaEliminada = await Puerta.findByIdAndDelete(req.params.id);
    if (!puertaEliminada) {
      return res.status(404).json({ mensaje: 'Puerta no encontrada' });
    }
    res.json({ mensaje: 'Puerta eliminada correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al eliminar la puerta' });
  }
};
*/