const chai = require('chai');
const supertest = require('supertest');
const app = require('../app');

const { expect } = chai;
const request = supertest(app);

describe('Event API', () => {
  let createdEventId;

  beforeEach(async () => {
    // Nettoyer la table avant chaque test
    await request.delete('/events');

    // Créer un événement de base
    const event = {
      name: 'Battle of Heroes',
      description: 'An epic battle between legendary heroes.',
      date: '2024-12-31',
    };

    const res = await request.post('/events').send(event);
    expect(res.status).to.equal(201);
    createdEventId = res.body.id;
  });

  it('should create a new event', async () => {
    const event = {
      name: 'New Year Battle',
      description: 'A battle to start the new year.',
      date: '2025-01-01',
    };

    const res = await request.post('/events').send(event);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
    expect(res.body.name).to.equal(event.name);
  });

  it('should not create an event with missing required fields', async () => {
    const invalidEvent = {
      description: 'This event is missing required fields.',
    };

    const res = await request.post('/events').send(invalidEvent);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });

  it('should fetch all events', async () => {
    const res = await request.get('/events');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.greaterThan(0);
  });

  it('should fetch an event by ID', async () => {
    const res = await request.get(`/events/${createdEventId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('id', createdEventId);
    expect(res.body.name).to.equal('Battle of Heroes');
  });

  it('should not fetch an event with invalid ID', async () => {
    const res = await request.get('/events/9999');
    expect(res.status).to.equal(404);
  });

  it('should update an event', async () => {
    const updatedEvent = { name: 'Battle of Legends' };
    const res = await request.put(`/events/${createdEventId}`).send(updatedEvent);
    expect(res.status).to.equal(200);
    expect(res.body.name).to.equal('Battle of Legends');
  });

  it('should not update an event with invalid data', async () => {
    const invalidUpdate = { date: null };
    const res = await request.put(`/events/${createdEventId}`).send(invalidUpdate);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });

  it('should delete an event', async () => {
    const res = await request.delete(`/events/${createdEventId}`);
    expect(res.status).to.equal(204);

    const fetchRes = await request.get(`/events/${createdEventId}`);
    expect(fetchRes.status).to.equal(404);
  });

  it('should fetch all events after deleting one', async () => {
    await request.delete(`/events/${createdEventId}`);
    const res = await request.get('/events');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(0); // On s'attend à n'avoir aucun événement
  });
});
