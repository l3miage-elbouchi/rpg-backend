const express = require('express');
const router = express.Router();
const { createEvent, getEvents, getEventById, updateEvent, deleteEvent, deleteAllEvents } = require('../controllers/eventController');

// Créer un événement
router.post('/', createEvent);

// Obtenir tous les événements
router.get('/', getEvents);

// Obtenir un événement par ID
router.get('/:id', getEventById);

// Mettre à jour un événement
router.put('/:id', updateEvent);

// Supprimer un événement
router.delete('/:id', deleteEvent);

// Supprimer tous les événements (opt)
router.delete('/', deleteAllEvents);

module.exports = router;
