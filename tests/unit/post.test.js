const request = require('supertest');
const crypto = require('crypto');
const app = require('../../src/app');

/**
 * @typedef {import('../../src/types.js').PostResponse} PostResponse
 */

/**
 * Sends a POST request to create a fragment.
 * @param {Buffer|string} data The data to send in the request.
 * @param {string} contentType The MIME type of the data.
 * @param {string} email The email for authentication.
 * @param {string} password The password for authentication.
 * @returns {Promise<PostResponse>} The response from the server.
 */
async function postFragment(data, contentType, email = 'user1@email.com', password = 'password1') {
  const length = typeof data === 'string' ? data.length : Buffer.byteLength(data);
  return await request(app)
    .post('/v1/fragments')
    .auth(email, password)
    .send(data)
    .set('Content-Type', contentType)
    .set('Content-Length', length.toString());
}

describe('POST /v1/fragments', () => {
  test('authenticated users get a fragment by id', async () => {
    const data = Buffer.from([1, 2, 3]);
    const res = await postFragment(data, 'text/plain');

    expect(res.statusCode).toBe(201);
  });

  test('expect correct location header', async () => {
    const data = Buffer.from([1, 2, 3]);
    const res = await postFragment(data, 'text/plain');

    expect(res.header.location.endsWith(`v1/fragments/${res.body.fragment.id}`)).toBe(true);
  });

  test('invalid user not authorized and returns 401', async () => {
    const data = Buffer.from([1, 2, 3]);
    const res = await postFragment(data, 'text/plain', 'bademail', 'badpassword');

    expect(res.statusCode).toBe(401);
  });

  test('correct owner id returned from post response', async () => {
    const res = await postFragment('hello', 'text/plain');

    expect(res.body.fragment.ownerId).toBe(
      crypto.createHash('sha256').update('user1@email.com').digest('hex')
    );
  });

  test('invalid type returns HTTP 415 status', async () => {
    const res = await postFragment('hello', 'audio/mpeg');

    expect(res.statusCode).toBe(415);
  });
});
