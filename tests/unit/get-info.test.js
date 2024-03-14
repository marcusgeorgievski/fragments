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

    const getReq = await request(app)
      .get('/v1/fragments/' + postResult.id + '/info')
      .auth('user1@email.com', 'password1');
    console.log(getReq.body);

    const getResult = getReq.body.fragment;

    expect(getResult.id).toBe(postResult.id);
  });
});
