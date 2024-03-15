const request = require('supertest');

const app = require('../../src/app');

describe('GET /v1/fragments/:id/info', () => {
  test('user can create fragment, get it, and have the same id', async () => {
    const text = 'Hello';

    const data = Buffer.from(text);

    const postReq = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .send(data)
      .set('Content-Type', 'text/plain')
      .set('Content-Length', data.length);

    const postResult = postReq.body.fragment;

    const getRes = await request(app)
      .get('/v1/fragments/' + postResult.id + '/info')
      .auth('user1@email.com', 'password1');
    console.log(getRes.body);

    const getResult = getRes.body.fragment;

    expect(getResult.id).toBe(postResult.id);
    expect(getRes.status).toBe(200);
  });

  test('info has proper keys', async () => {
    const postRes = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .send('hello')
      .set('Content-Type', 'text/plain')
      .set('Content-Length', 'hello'.length);

    const postFragment = postRes.body.fragment;

    const getExpandedRes = await request(app)
      .get(`/v1/fragments/${postFragment.id}/info`)
      .auth('user1@email.com', 'password1');

    const fragment = getExpandedRes.body.fragment;

    expect('fragment' in getExpandedRes.body).toBe(true);

    // Ensure the expanded fragment has the correct keys
    expect('ownerId' in fragment).toBe(true);
    expect('created' in fragment).toBe(true);
    expect('updated' in fragment).toBe(true);
    expect('size' in fragment).toBe(true);
    expect('type' in fragment).toBe(true);
    expect('id' in fragment).toBe(true);
  });

  test('unknown fragment returns HTTP 404', async () => {
    await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .send('hello')
      .set('Content-Type', 'text/plain')
      .set('Content-Length', 'hello'.length);

    // const postFragment = postRes.body.fragment;

    const getExpandedRes = await request(app)
      .get(`/v1/fragments/BAD-ID/info`)
      .auth('user1@email.com', 'password1');

    expect(getExpandedRes.status).toBe(404);
  });
});
