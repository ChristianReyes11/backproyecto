const Puerta = require('../models/puerta');
const mqtt = require('mqtt');
// Configura la conexión al broker MQTT
const mqttClient = mqtt.connect('ws://192.168.1.81:8083/mqtt'); // Reemplaza 'broker.example.com' con la dirección de tu broker MQTT

// Abrir Puerta por su ID
exports.abrirPuerta = async (req, res) => {
  try {
    const { id } = req.params;
    const puerta = await Puerta.findById(id);
    if (!puerta) {
      return res.status(404).json({ error: 'Puerta no encontrada'});
    }
    const payload = {
      id: puerta._id,
      nombre: puerta.nombre,
      estado: true
    };

    mqttClient.subscribe('domotica/puertas/open-close');
    mqttClient.on('connect', () => {
    console.log('Conexión exitosa al broker MQTT');
    });
    mqttClient.on('message', async (topic, message) => {
      console.log(`Mensaje recibido en el tema ${topic}: ${message.toString()}`);
      // Aquí puedes realizar las acciones correspondientes en tu API según el mensaje recibido desde el broker MQTT
      puerta.estado = true;
      await puerta.save();
    });

    mqttClient.publish('domotica/puertas/open-close', JSON.stringify(payload));
    res.send('Mensaje enviado al broker MQTT');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener la puerta' });
  } 
};

// Cerrar Puerta por su ID
exports.cerrarPuerta = async (req, res) => {
  try {
    const { id } = req.params;
    const puerta = await Puerta.findById(id);
    if (!puerta) {
      return res.status(404).json({ error: 'Puerta no encontrada'});
    }
    const payload = {
      id: puerta._id,
      nombre: puerta.nombre,
      estado: true
    };

    mqttClient.subscribe('domotica/puertas/open-close');
    mqttClient.on('connect', () => {
      console.log('Conexión exitosa al broker MQTT');
    });
    mqttClient.on('message', async (topic, message) => {
      console.log(`Mensaje recibido en el tema ${topic}: ${message.toString()}`);
      // Aquí puedes realizar las acciones correspondientes en tu API según el mensaje recibido desde el broker MQTT
      puerta.estado = false;
      await puerta.save();
    });
    mqttClient.publish('domotica/puertas/open-close', JSON.stringify(payload));
    res.send('Mensaje enviado al broker MQTT');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener la puerta' });
  } 
};

// Obtener todas las puertas
exports.getPuertas = async (req, res) => {
  try {
    const puertas = await Puerta.find();
    res.status(200).json(puertas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener las puertas' });
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