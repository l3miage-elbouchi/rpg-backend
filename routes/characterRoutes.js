const express = require('express');
const Character = require('../models/Character');
const router = express.Router();

// Créer un personnage
router.post('/', async (req, res) => {
    try {
      const character = await Character.create(req.body);
      res.status(201).json(character);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  });

// Lire tous les personnages
/*router.get('/', async (req, res) => {
  try {
    const characters = await Character.findAll();
    res.status(200).json(characters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});*/
// Récupérer tous les personnages
router.get('/', async (req, res) => {
  try {
    const characters = await Character.findAll();
    res.status(200).json(characters); // Retourner tous les personnages
  } catch (error) {
    res.status(500).json({ error: error.message }); // Gestion des erreurs
  }
});

// Récupérer un personnage par son ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id; // Récupérer l'ID depuis les paramètres de l'URL
    const character = await Character.findByPk(id); // Utiliser Sequelize pour trouver le personnage

    if (!character) {
      return res.status(404).json({ error: 'Character not found' }); // Si le personnage n'existe pas
    }

    res.status(200).json(character); // Retourner les infos du personnage
  } catch (error) {
    res.status(500).json({ error: error.message }); // Gestion des erreurs
  }
});


  
  

// Modifier un personnage
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Character.update(req.body, { where: { id } });
    if (updated) {
      const updatedCharacter = await Character.findOne({ where: { id } });
      res.status(200).json(updatedCharacter);
    } else {
      res.status(404).json({ error: 'Character not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supprimer un personnage
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Character.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Character not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
