const request = require('supertest');
const crypto = require('crypto');

const app = require('../../src/app');

describe('POST /v1/fragments', () => {
  test('authenticated users get a fragment by id', async () => {
    const data = Buffer.from([1, 2, 3]);

    const res = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .send(data)
      .set('Content-Type', 'text/plain')
      .set('Content-Length', data.length);

    expect(res.statusCode).toBe(200);
  });

  test('invalid user not authorized and returns 401 status', async () => {
    const data = Buffer.from([1, 2, 3]);

    const res = await request(app)
      .post('/v1/fragments')
      .auth('user1@emailcom', 'password1')
      .send(data)
      .set('Content-Type', 'text/plain')
      .set('Content-Length', data.length);

    expect(res.statusCode).toBe(401);
  });

  test('correct owner id returned from post response', async () => {
    const res = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .send('hello')
      .set('Content-Type', 'text/plain')
      .set('Content-Length', 'hello'.length);

    expect(res.body.fragment.ownerId).toBe(
      crypto.createHash('sha256').update('user1@email.com').digest('hex')
    );
  });
});
