const Luz = require('../models/luz');
const mqtt = require('mqtt');
// Configura la conexión al broker MQTT
const mqttClient = mqtt.connect('ws://192.168.1.81:8083/mqtt'); // Reemplaza 'broker.example.com' con la dirección de tu broker MQTT

// Encender Luz por su ID
exports.encenderLuz = async (req, res) => {
  try {
    const { id } = req.params;
    const luz = await Luz.findById(id);
    if (!luz) {
      return res.status(404).json({ error: 'Luz no encontrada'});
    }
    const payload = {
      id: luz._id,
      nombre: luz.nombre,
      estado: true,
      brillo: luz.brillo,
      programar: luz.programar,
      color: luz.color
    };

    mqttClient.subscribe('domotica/luz/on-off');
    mqttClient.on('connect', () => {
      console.log('Conexión exitosa al broker MQTT');
    });
    mqttClient.on('message', async (topic, message) => {
      console.log(`Mensaje recibido en el tema ${topic}: ${message.toString()}`);
      // Actualizar el estado de la luz a "Encendida" en la BD
      luz.estado = true;
      await luz.save();
    });

    mqttClient.publish('domotica/luz/on-off', JSON.stringify(payload));
    res.send('Mensaje enviado al broker MQTT');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener la luz' });
  } 
};

// Apagar Luz por su ID
exports.apagarLuz = async (req, res) => {
  try {
    const { id } = req.params;
    const luz = await Luz.findById(id);
    if (!luz) {
      return res.status(404).json({ error: 'Luz no encontrada'});
    }
    const payload = {
      id: luz._id,
      nombre: luz.nombre,
      estado: true,
      brillo: luz.brillo,
      programar: luz.programar,
      color: luz.color
    };

    mqttClient.subscribe('domotica/luz/on-off');
    mqttClient.on('connect', () => {
      console.log('Conexión exitosa al broker MQTT');
    });
    mqttClient.on('message', async (topic, message) => {
      console.log(`Mensaje recibido en el tema ${topic}: ${message.toString()}`);
      // Actualuzar el estado de la luz a "Apagada" en la BD
      luz.estado = false;
      await luz.save();
    });
    mqttClient.publish('domotica/luz/on-off', JSON.stringify(payload));
    res.send('Mensaje enviado al broker MQTT');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener la luz' });
  } 
};  

// Obtener todas las luces
exports.getLuces = async (req, res) => {
  try {
    const luces = await Luz.find();
    res.status(200).json({luces});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al obtener las luces' });
  }
};

// Obtener una luz por su ID
exports.getLuzById = async (req, res) => {
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
exports.createLuz = async (req, res) => {
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
exports.updateLuz = async (req, res) => {
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
exports.deleteLuz = async (req, res) => {
  try {
    const { id } = req.params;
    const luz = await Luz.findByIdAndDelete(id);
    if (!luz) {
      return res.status(404).json({ error: 'Luz no encontrada' });
    } 
    res.json({ message: 'Luz eliminada correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar la luz' });
  }
};