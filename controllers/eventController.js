const Event = require('../models/Event');

// Créer un événement
exports.createEvent = async (req, res) => {
  try {
    if (!req.body.name || !req.body.date) {
      return res.status(400).json({ error: 'Name and date are required' });
    }
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir tous les événements
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir un événement par ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un événement
exports.updateEvent = async (req, res) => {
  try {
    if ('date' in req.body && (req.body.date === null || req.body.date === '')) {
      return res.status(400).json({ error: 'Invalid date provided' });
    }

    if ('name' in req.body && (req.body.name === null || req.body.name === '')) {
      return res.status(400).json({ error: 'Invalid name provided' });
    }

    const [updated] = await Event.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedEvent = await Event.findByPk(req.params.id);
      res.status(200).json(updatedEvent);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un événement
exports.deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer tous les événements
exports.deleteAllEvents = async (req, res) => {
  try {
    await Event.destroy({ where: {}, truncate: true, restartIdentity: true });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

