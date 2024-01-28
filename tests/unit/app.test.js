const request = require('supertest');

const app = require('../../src/app');

describe('error handling middleware', () => {
  test('handle unkown route', async () => {
    const res = await request(app).get('/test');
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe('error');
    expect(res.body.error.message).toBe('cannot find the requested resource');
    expect(res.body.error.code).toBe(404);
  });

  // test('handle server level error', async () => {
  //   request(app).post('/error').send({ name: 'john' });
  // });
});
