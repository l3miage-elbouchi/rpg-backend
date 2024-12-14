const chai = require('chai');
const supertest = require('supertest');
const app = require('../app');
const sequelize = require('../models/index');
const Character = require('../models/Character');
const Item = require('../models/Item');

const { expect } = chai;
const request = supertest(app);

describe('Character API - Comprehensive Tests', () => {
  let createdCharacterId;

  beforeEach(async () => {
    // Désactivation des foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
    await Item.destroy({ where: {} });
    await Character.destroy({ where: {} });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');

    const character = {
      name: 'Ismail',
      health: 100,
      strength: 20,
      defense: 10,
    };

    const res = await request.post('/characters').send(character);
    createdCharacterId = res.body.id;
  });

  afterEach(async () => {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
    await Item.destroy({ where: {} });
    await Character.destroy({ where: {} });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
  });

  it('should create a new character', async () => {
    const character = {
      name: 'Hero',
      health: 120,
      strength: 30,
      defense: 15,
    };

    const res = await request.post('/characters').send(character);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
    expect(res.body.name).to.equal(character.name);
  });

  it('should not create a character with invalid data', async () => {
    const invalidCharacter = {
      name: 'Jo',
      health: -50,
      strength: -10,
      defense: -5,
    };

    const res = await request.post('/characters').send(invalidCharacter);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });

  it('should fetch all characters', async () => {
    const res = await request.get('/characters');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.length.greaterThan(0);
  });

  it('should fetch a character by ID', async () => {
    const res = await request.get(`/characters/${createdCharacterId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('id', createdCharacterId);
    expect(res.body.name).to.equal('Ismail');
  });

  it('should not fetch a character with invalid ID', async () => {
    const res = await request.get('/characters/9999');
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property('error');
  });

  it('should update a character', async () => {
    const updatedCharacter = {
      name: 'Updated Hero',
      health: 150,
      strength: 50,
      defense: 25,
    };

    const res = await request.put(`/characters/${createdCharacterId}`).send(updatedCharacter);
    expect(res.status).to.equal(200);
    expect(res.body.name).to.equal(updatedCharacter.name);
  });

  it('should not update a character with invalid data', async () => {
    const invalidUpdate = { health: -100 };
    const res = await request.put(`/characters/${createdCharacterId}`).send(invalidUpdate);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });

  it('should delete a character', async () => {
    const res = await request.delete(`/characters/${createdCharacterId}`);
    expect(res.status).to.equal(204);

    const fetchRes = await request.get(`/characters/${createdCharacterId}`);
    expect(fetchRes.status).to.equal(404);
  });

  it('should validate that name has at least 3 characters', async () => {
    const invalidCharacter = { name: 'Jo', health: 100, strength: 20, defense: 10 };
    const res = await request.post('/characters').send(invalidCharacter);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });

  it('should validate that health, strength, and defense are positive', async () => {
    const invalidCharacter = { name: 'Hero', health: -10, strength: -20, defense: -5 };
    const res = await request.post('/characters').send(invalidCharacter);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });

  it('should validate createdAt and updatedAt fields', async () => {
    const res = await request.get(`/characters/${createdCharacterId}`);
    expect(res.status).to.equal(200);
    expect(new Date(res.body.createdAt)).to.be.a('date');
    expect(new Date(res.body.updatedAt)).to.be.a('date');
  });

  it('should ensure health is within a specific range', async () => {
    const invalidCharacter = { name: 'Hero', health: 1000, strength: 20, defense: 10 };
    const res = await request.post('/characters').send(invalidCharacter);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });



  it('should return 400 if required fields are missing', async () => {
    const characterWithoutName = { health: 100, strength: 20, defense: 10 };
    const res = await request.post('/characters').send(characterWithoutName);
    expect(res.status).to.equal(400);
    expect(res.body.error).to.exist;
  });

  it('should return 400 if health exceeds the maximum allowed value', async () => {
    const invalidCharacter = { name: 'OverMax', health: 501, strength: 20, defense: 10 };
    const res = await request.post('/characters').send(invalidCharacter);
    expect(res.status).to.equal(400);
    expect(res.body.error).to.include('Health must not exceed 500');
  });

  it('should partially update a character', async () => {
    const originalCharacter = await request.get(`/characters/${createdCharacterId}`);
    const originalData = originalCharacter.body;

    const res = await request.put(`/characters/${createdCharacterId}`).send({ health: 200 });
    expect(res.status).to.equal(200);
    expect(res.body.health).to.equal(200);
    // Vérifier que le nom n’a pas changé
    expect(res.body.name).to.equal(originalData.name);
  });

  it('should return 404 when deleting a non-existent character', async () => {
    const res = await request.delete('/characters/999999');
    expect(res.status).to.equal(404);
    expect(res.body.error).to.equal('Character not found');
  });

  it('should return an empty array if no characters exist', async () => {
    // On supprime le personnage créé par le beforeEach
    await request.delete(`/characters/${createdCharacterId}`);
    const res = await request.get('/characters');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(0);
  });

  it('should return a clear error message for invalid character data', async () => {
    const invalidCharacter = { name: 'Ab', health: -1, strength: 0, defense: 0 };
    const res = await request.post('/characters').send(invalidCharacter);
    expect(res.status).to.equal(400);
    expect(res.body.error).to.be.an('array');
    // On s’assure que chaque message d’erreur attendu est présent :
    const errorMessages = res.body.error.join(' ');
    expect(errorMessages).to.include('Name must be at least 3 characters long');
    expect(errorMessages).to.include('Health must be positive');
    expect(errorMessages).to.include('Strength must be positive');
    expect(errorMessages).to.include('Defense must be positive');
  });
});
