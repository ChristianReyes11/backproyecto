const Luz = require('../models/luz');

// Obtener todas las luces
const getLuces = async (req, res) => {
  try {
    const luces = await Luz.find();
    res.status(200).json({luces});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al obtener las luces' });
  }
};

// Obtener una luz por su ID
const getLuzById = async (req, res) => {
  try {
    const { id } = req.params;
    const luz = await Luz.findById(id);
    if (!luz) {
      return res.status(404).json({ error: 'Luz no encontrada'});
    }
    res.status(200).json({luz})
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener la luz' });
  }
};

// Crear una nueva luz
const createLuz = async (req, res) => {
  try {
    console.log(req.body)
    const { nombre, estado, brillo, programar, color } = req.body;
    const luz = new Luz({nombre, estado, brillo, programar, color})
    await luz.save();
    res.status(201).json(luz);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error al crear la luz' });
  }
};

// Actualizar una luz existente
const updateLuz = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, estado, brillo, programar, color } = req.body;
    const luz = await Luz.findByIdAndUpdate(
      id,
      { nombre, estado, brillo, programar, color },
      { new: true }
    );
    if (!luz) {
      return res.status(404).json( {error: 'Luz no encontrada'});
    } 
    res.status(200).json({ luz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar la luz' });
  }
};

// Eliminar una luz existente
const deleteLuz = async (req, res) => {
  try {
    const { id } = req.params;
    const luz = await Luz.findByIdAndDelete(id);
    if (!luz) {
      return res.status(404).json({ error: 'Luz no encontrada' });
    } 
    res.json({ message: 'Puerta eliminada correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar la luz' });
  }
};

module.exports = {
  getLuces,
  getLuzById,
  createLuz,
  updateLuz,
  deleteLuz,
};
