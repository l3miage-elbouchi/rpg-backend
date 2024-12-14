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
      return res.status(400).json({ error: error.errors.map(e => e.message) });
    }
    res.status(500).json({ error: error.message });
  }
});

// Récupérer tous les personnages
router.get('/', async (req, res) => {
  try {
    const characters = await Character.findAll();
    res.status(200).json(characters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Récupérer un personnage par ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const character = await Character.findByPk(id);

    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

    res.status(200).json(character);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mettre à jour un personnage
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const character = await Character.findByPk(id);

    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

    // On utilise la méthode update sur l'instance pour capturer les erreurs de validation
    try {
      await character.update(req.body);
      res.status(200).json(character);
    } catch (updateError) {
      if (updateError.name === 'SequelizeValidationError') {
        return res.status(400).json({ error: updateError.errors.map(e => e.message) });
      }
      throw updateError;
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
