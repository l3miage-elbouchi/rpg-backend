const chai = require('chai');
const supertest = require('supertest');
const app = require('../app'); // Importez l'application Express

const { expect } = chai;
const request = supertest(app);

describe('Item API', () => {
  let createdItemId;

  it('should create a new item', async () => {
    const item = {
      name: 'Sword',
      type: 'weapon',
      value: 100,
      characterId: 1, // Assurez-vous qu'un personnage existe avec cet ID
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
