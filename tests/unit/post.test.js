const request = require('supertest');
const crypto = require('crypto');
const app = require('../../src/app');

/**
 * @typedef {import('../../src/types.js').PostResponse} PostResponse
 */

describe('POST /v1/fragments', () => {
  test('authenticated users get a fragment by id', async () => {
    const data = Buffer.from([1, 2, 3]);

    /** @type {PostResponse} */
    const res = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .send(data)
      .set('Content-Type', 'text/plain')
      .set('Content-Length', data.length);

    expect(res.statusCode).toBe(201);
  });

  test('expect correct location header', async () => {
    const data = Buffer.from([1, 2, 3]);

    /** @type {PostResponse} */
    const res = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .send(data)
      .set('Content-Type', 'text/plain')
      .set('Content-Length', data.length);

    expect(res.header.location.endsWith(`v1/fragments/${res.body.fragment.id}`)).toBe(true);
  });

  test('invalid user not authorized and returns 401', async () => {
    const data = Buffer.from([1, 2, 3]);

    /** @type {PostResponse} */
    const res = await request(app)
      .post('/v1/fragments')
      .auth('user1@emailcom', 'password1')
      .send(data)
      .set('Content-Type', 'text/plain')
      .set('Content-Length', data.length);

    expect(res.statusCode).toBe(401);
  });

  test('correct owner id returned from post response', async () => {
    /** @type {PostResponse} */
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

  test('invalid type returns HTTP 415 status', async () => {
    /** @type {PostResponse} */
    const res = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .send('hello')
      .set('Content-Type', 'audio/mpeg')
      .set('Content-Length', 'hello'.length);

    expect(res.statusCode).toBe(415);
  });
});
