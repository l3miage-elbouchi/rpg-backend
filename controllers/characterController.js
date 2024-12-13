const Character = require('../models/Character');

// Créer un personnage
exports.createCharacter = async (req, res) => {
  try {
    const character = await Character.create(req.body);
    res.status(201).json(character);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir tous les personnages
exports.getCharacters = async (req, res) => {
  try {
    const characters = await Character.findAll();
    res.status(200).json(characters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un personnage
exports.updateCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Character.update(req.body, { where: { id } });
    if (updated) {
      const updatedCharacter = await Character.findOne({ where: { id } });
      res.status(200).json(updatedCharacter);
    } else {
      res.status(404).json({ error: "Character not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un personnage
exports.deleteCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Character.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send(); // Pas de contenu
    } else {
      res.status(404).json({ error: "Character not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
