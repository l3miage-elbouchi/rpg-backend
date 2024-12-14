const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const Character = require('../models/Character');

// Créer un objet
router.post('/', async (req, res) => {
  try {
    const { characterId } = req.body;
    if (characterId) {
      const character = await Character.findByPk(characterId);
      if (!character) {
        return res.status(404).json({ error: 'Character not found' });
      }
    }

    if (req.body.value && req.body.value < 0) {
      return res.status(400).json({ error: 'Item value cannot be negative' });
    }

    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lire tous les objets
router.get('/', async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mettre à jour un objet
router.put('/:id', async (req, res) => {
  try {
    if (req.body.value && req.body.value < 0) {
      return res.status(400).json({ error: 'Item value cannot be negative' });
    }

    const { id } = req.params;
    const [updated] = await Item.update(req.body, { where: { id } });
    if (updated) {
      const updatedItem = await Item.findOne({ where: { id } });
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supprimer un objet
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Item.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
