const chai = require('chai');
const supertest = require('supertest');
const app = require('../app');
const sequelize = require('../models/index');
const { expect } = chai;
const request = supertest(app);

let characterId;
let createdItemId;

describe('Item API', () => {
  before(async () => {
    // Nettoyage de la BDD
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
    await sequelize.models.Item.destroy({ where: {} });
    await sequelize.models.Character.destroy({ where: {} });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');

    // Créer un personnage avant les tests d'item
    const characterResponse = await request.post('/characters').send({
      name: 'TestChar',
      health: 100,
      strength: 20,
      defense: 10,
    });
    expect(characterResponse.status).to.equal(201);
    characterId = characterResponse.body.id;
  });

  it('should create a new item', async () => {
    const item = {
      name: 'Sword',
      type: 'weapon',
      value: 100,
      characterId: characterId,
    };

    const res = await request.post('/items').send(item);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
    createdItemId = res.body.id;
  });

  it('should fetch all items', async () => {
    const res = await request.get('/items');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should update an item', async () => {
    const updatedData = {
      name: 'Shield',
      type: 'armor',
      value: 150,
    };

    const res = await request.put(`/items/${createdItemId}`).send(updatedData);
    expect(res.status).to.equal(200);
    expect(res.body.name).to.equal(updatedData.name);
  });

  it('should delete an item', async () => {
    const res = await request.delete(`/items/${createdItemId}`);
    expect(res.status).to.equal(204);
  });
});
