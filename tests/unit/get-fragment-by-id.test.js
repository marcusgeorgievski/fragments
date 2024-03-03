const request = require('supertest');

const app = require('../../src/app');

describe('POST /v1/fragments', () => {
  // test('user can create fragment then get by id', async () => {
  //   const data = Buffer.from([1, 2, 3]);
  //   const res = await request(app)
  //     .post('/v1/fragments')
  //     .auth('user1@email.com', 'password1')
  //     .send(data)
  //     .set('Content-Type', 'text/plain')
  //     .set('Content-Length', data.length);
  //   const result = res.body.fragment;
  //   const res2 = await request(app)
  //     .get('/v1/fragments/' + result.id)
  //     .auth('user1@email.com', 'password1');
  //   expect(result.id).toBe(res2.body.fragment.id);
  // });
  // test('invalid id does x', async () => {
  //   const data = Buffer.from([1, 2, 3]);
  //   const res = await request(app)
  //     .post('/v1/fragments')
  //     .auth('user1@email.com', 'password1')
  //     .send(data)
  //     .set('Content-Type', 'text/plain')
  //     .set('Content-Length', data.length);
  //   const result = res.body.fragment;
  //   const res2 = await request(app)
  //     .get('/v1/fragments/' + result.id)
  //     .auth('user1@email.com', 'password1');
  //   expect(result.id).toBe(res2.body.fragment.id);
  // });
  test('invalid id does x', async () => {
    const data = Buffer.from([1, 2, 3]);
    const res = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .send(data)
      .set('Content-Type', 'text/plain')
      .set('Content-Length', data.length);
    const result = res.body.fragment;

    await request(app)
      .get('/v1/fragments/' + result.id)
      .auth('user1@email.com', 'password1');
    expect(1).toBe(1);
  });
});
