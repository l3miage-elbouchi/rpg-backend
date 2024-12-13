beforeEach(async () => {
  // Supprimez tous les personnages existants
  await request.delete('/characters');
  
  // Créez un personnage de base pour les tests
  const character = {
    name: 'Ismail',
    health: 100,
    strength: 20,
    defense: 10,
  };

  const res = await request.post('/characters').send(character);
  createdCharacterId = res.body.id; // Sauvegardez l'ID pour les tests suivants
});


const chai = require('chai');
const supertest = require('supertest');
const app = require('../app'); // Importez l'application Express

const { expect } = chai; // Utilisez `expect` pour les assertions
const request = supertest(app); // Initialisez `supertest` avec l'application

describe('Character API', () => {
  let createdCharacterId; // ID du personnage créé pour les tests suivants

  // Test de création d'un personnage
  it('should create a new character', async () => {
    const character = {
      name: 'Ismail',
      health: 100,
      strength: 20,
      defense: 10,
    };

    const res = await request.post('/characters').send(character);

    expect(res.status).to.equal(201); // Vérifiez le code de statut HTTP
    expect(res.body).to.have.property('id'); // Vérifiez que l'ID est retourné
    expect(res.body.name).to.equal(character.name); // Vérifiez que le nom correspond

    createdCharacterId = res.body.id; // Sauvegardez l'ID pour les tests suivants
  });

  // Test de lecture de tous les personnages
  it('should fetch all characters', async () => {
    const res = await request.get('/characters');

    expect(res.status).to.equal(200); // Vérifiez le code de statut HTTP
    expect(res.body).to.be.an('array'); // Vérifiez que le résultat est un tableau
    expect(res.body).to.have.length.greaterThan(0); // Vérifiez qu'il y a au moins un personnage
  });

  // Test de lecture d'un personnage spécifique
  it('should fetch all characters', async () => {
    // Crée un personnage pour s'assurer qu'il y a des données
    const newCharacter = {
      name: 'Ismail',
      health: 100,
      strength: 20,
      defense: 10,
    };
  
    await request.post('/characters').send(newCharacter);
  
    // Test de récupération de tous les personnages
    const res = await request.get('/characters');
    expect(res.status).to.equal(200); // Attendez-vous à un statut 200
    expect(res.body).to.be.an('array'); // Vérifiez que la réponse est un tableau
    expect(res.body.length).to.be.greaterThan(0); // Vérifiez qu'il y a au moins un personnage
  });
  


    // Test pour vérifier que les deux fonctionnalités coexistent
    it('should fetch all characters and a specific character without conflicts', async () => {
      // Vérifiez tous les personnages
      const allCharactersRes = await request.get('/characters');
      expect(allCharactersRes.status).to.equal(200);
      expect(allCharactersRes.body).to.be.an('array');
      expect(allCharactersRes.body).to.have.length.greaterThan(0);
  
      // Vérifiez un personnage spécifique
      const specificCharacterRes = await request.get(`/characters/${createdCharacterId}`);
      expect(specificCharacterRes.status).to.equal(200);
      expect(specificCharacterRes.body).to.have.property('id', createdCharacterId);
      expect(specificCharacterRes.body.name).to.equal('Ismail');
    });
  

  // Test de mise à jour d'un personnage
  it('should update a character', async () => {
    const updatedData = {
      name: 'Updated Ismail',
      health: 120,
      strength: 30,
      defense: 15,
    };

    const res = await request.put(`/characters/${createdCharacterId}`).send(updatedData);

    expect(res.status).to.equal(200); // Vérifiez le code de statut HTTP
    expect(res.body.name).to.equal(updatedData.name); // Vérifiez que le nom a été mis à jour
    expect(res.body.health).to.equal(updatedData.health); // Vérifiez la santé mise à jour
  });

  // Test de suppression d'un personnage
  it('should delete a character', async () => {
    const res = await request.delete(`/characters/${createdCharacterId}`);

    expect(res.status).to.equal(204); // Vérifiez le code de statut HTTP (Pas de contenu)

    // Vérifiez que le personnage a été supprimé
    const fetchRes = await request.get(`/characters/${createdCharacterId}`);
    expect(fetchRes.status).to.equal(404); // Vérifiez que le personnage n'existe plus
  });

  // Test de création invalide (nom manquant)
  it('should not create a character without a name', async () => {
    const invalidCharacter = {
      health: 100,
      strength: 20,
      defense: 10,
    };

    const res = await request.post('/characters').send(invalidCharacter);

    expect(res.status).to.equal(400); // Vérifiez que l'erreur est bien 400 (Requête invalide)
    expect(res.body).to.have.property('error'); // Vérifiez qu'un message d'erreur est retourné
  });
});
