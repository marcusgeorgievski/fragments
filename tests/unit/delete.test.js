const request = require('supertest');
const app = require('../../src/app');
const { postFragment } = require('../utils');

describe('DELETE /v1/fragments/:id', () => {
  // If the request is missing the Authorization header, it should be forbidden
  test('unauthenticated requests are denied', () => request(app).get('/v1/fragments').expect(401));

  test('delete non-existent fragment returns 404', async () => {
    const deleteRes = await request(app)
      .delete(`/v1/fragments/invalid-fragment-id`)
      .auth('user1@email.com', 'password1');

    expect(deleteRes.status).toBe(404);
  });
  test("delete existing fragment returns 200 and 'ok'", async () => {
    const postRes = await postFragment('## hello', 'text/markdown');
    const fragment = postRes.body.fragment;

    const deleteRes = await request(app)
      .delete(`/v1/fragments/${fragment.id}`)
      .auth('user1@email.com', 'password1');

    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.status).toBe('ok');
  });
});
