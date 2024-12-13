const Item = require('../models/Item');

// Créer un objet
exports.createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire tous les objets
exports.getItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un objet
exports.updateItem = async (req, res) => {
  try {
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
};

// Supprimer un objet
exports.deleteItem = async (req, res) => {
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
};
