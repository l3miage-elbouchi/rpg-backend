const express = require('express');
const itemController = require('../controllers/itemController');

const router = express.Router();

// Routes
router.post('/', itemController.createItem); // Créer un objet
router.get('/', itemController.getItems); // Lire tous les objets
router.put('/:id', itemController.updateItem); // Mettre à jour un objet
router.delete('/:id', itemController.deleteItem); // Supprimer un objet

module.exports = router;
