const db = require('../models/luz');

// Obtener todas las luces
const getLuces = async (req, res) => {
  try {
    const luces = await db.Luz.findAll();
    res.status(200).json(luces);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error al obtener las luces' });
  }
};

// Obtener una luz por su ID
const getLuzById = async (req, res) => {
  const { id } = req.params;
  try {
    const luz = await db.Luz.findByPk(id);
    if (luz) {
      res.status(200).json(luz);
    } else {
      res.status(404).json({ message: 'Luz no encontrada' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error al obtener la luz' });
  }
};

// Crear una nueva luz
const createLuz = async (req, res) => {
  const { nombre, estado, brillo, programar, color } = req.body;
  try {
    const luz = await db.Luz.create({
      nombre,
      estado,
      brillo,
      programar,
      color,
    });
    res.status(201).json(luz);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error al crear la luz' });
  }
};

// Actualizar una luz existente
const updateLuz = async (req, res) => {
  const { id } = req.params;
  const { nombre, estado, brillo, programar, color } = req.body;
  try {
    const luz = await db.Luz.findByPk(id);
    if (luz) {
      luz.nombre = nombre;
      luz.estado = estado;
      luz.brillo = brillo;
      luz.programar = programar;
      luz.color = color;
      await luz.save();
      res.status(200).json(luz);
    } else {
      res.status(404).json({ message: 'Luz no encontrada' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error al actualizar la luz' });
  }
};

// Eliminar una luz existente
const deleteLuz = async (req, res) => {
  const { id } = req.params;
  try {
    const luz = await db.Luz.findByPk(id);
    if (luz) {
      await luz.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Luz no encontrada' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error al eliminar la luz' });
  }
};

module.exports = {
  getLuces,
  getLuzById,
  createLuz,
  updateLuz,
  deleteLuz,
};
