const request = require('supertest');

const app = require('../../src/app');

describe('GET /v1/fragments/:id/info', () => {
  test('user can create fragment then get by id', async () => {
    const text = 'Hello';

    const data = Buffer.from(text);

    const res = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .send(data)
      .set('Content-Type', 'text/plain')
      .set('Content-Length', data.length);

    const result = res.body.fragment;

    const res2 = await request(app)
      .get('/v1/fragments/' + result.id + '/info')
      .auth('user1@email.com', 'password1');
    console.log(res2.body);

    expect(res2.body.fragment.id).toBe(result.id);
  });
});
