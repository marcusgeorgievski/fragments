const request = require('supertest');
const app = require('../../src/app');
const { postFragment } = require('../utils');

describe('PUT /v1/fragments/:id', () => {
  test('update non-existent fragment', async () => {
    const deleteRes = await request(app)
      .delete(`/v1/fragments/invalid-fragment-id`)
      .auth('user1@email.com', 'password1');

    expect(deleteRes.status).toBe(404);
    expect(deleteRes.body.status).toBe('error');
    expect(deleteRes.body.error.code).toBe(404);
    expect(deleteRes.body.error.message).toContain('missing entry');
  });

  test('update existing fragment', async () => {
    const postRes = await postFragment('## hello', 'text/markdown');
    const initialFragment = postRes.body.fragment;

    console.log(initialFragment.id);

    const getRes = await request(app)
      .get(`/v1/fragments/${initialFragment.id}`)
      .auth('user1@email.com', 'password1');

    expect(getRes.status).toBe(200);
    expect(getRes.text).toBe('## hello');

    const putRes = await request(app)
      .put(`/v1/fragments/${initialFragment.id}`)
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'text/markdown')
      .set('Content-Length', '## goodbye'.length)
      .send('## goodbye');

    expect(putRes.status).toBe(200);
    expect(putRes.body.status).toBe('ok');
    expect(putRes.body.fragment.id).toBe(initialFragment.id);
  });
});
