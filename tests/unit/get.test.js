const request = require('supertest');
const app = require('../../src/app');
const { postFragment } = require('../utils');

describe('GET /v1/fragments', () => {
  // If the request is missing the Authorization header, it should be forbidden
  test('unauthenticated requests are denied', () => request(app).get('/v1/fragments').expect(401));

  // If the wrong username/password pair are used (no such user), it should be forbidden
  test('incorrect credentials are denied', () =>
    request(app).get('/v1/fragments').auth('invalid@email.com', 'incorrect_password').expect(401));

  // Using a valid username/password pair should give a success result with a .fragments array
  test('authenticated users get a fragments array', async () => {
    const res = await request(app).get('/v1/fragments').auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(Array.isArray(res.body.fragments)).toBe(true);
  });

  test('authenticated users get a fragments array of size 2 after 2 post reqs', async () => {
    await postFragment('hello', 'text/plain');

    await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .send('hello2')
      .set('Content-Type', 'text/plain')
      .set('Content-Length', 'hello2'.length);

    const getRes = await request(app).get('/v1/fragments').auth('user1@email.com', 'password1');
    expect(getRes.body.fragments.length).toBe(2);
  });

  test('expand has additional keys ', async () => {
    await postFragment('hello', 'text/plain');

    const getExpandedRes = await request(app)
      .get(`/v1/fragments`)
      .query({ expand: 1 })
      .auth('user1@email.com', 'password1');

    const fragment = getExpandedRes.body.fragments[0];

    // Ensure the expanded fragment has the correct keys
    expect('ownerId' in fragment).toBe(true);
    expect('created' in fragment).toBe(true);
    expect('updated' in fragment).toBe(true);
    expect('size' in fragment).toBe(true);
    expect('type' in fragment).toBe(true);
    expect('id' in fragment).toBe(true);
  });
});
