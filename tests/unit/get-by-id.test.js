const request = require('supertest');
const app = require('../../src/app');
const contentType = require('content-type');
const { postFragment } = require('../utils');

describe('GET /v1/fragments/:id', () => {
  test('user can create fragment then get by id', async () => {
    const data = Buffer.from('Hello');
    const postRes = await postFragment(data, 'text/plain');

    const result = postRes.body.fragment;

    const getRes = await request(app)
      .get('/v1/fragments/' + result.id)
      .auth('user1@email.com', 'password1');

    expect(getRes.text).toBe('Hello');
  });

  test('Correct status code and content type returned', async () => {
    const data = Buffer.from('Hello');

    const postRes = await postFragment(data, 'text/plain');

    const result = postRes.body.fragment;

    const getRes = await request(app)
      .get('/v1/fragments/' + result.id)
      .auth('user1@email.com', 'password1');

    expect(getRes.status).toBe(200);
    // content type is text/plain
    const { type } = contentType.parse(getRes);
    expect(type).toBe('text/plain');
  });

  test('unknown fragment returns HTTP 404', async () => {
    await postFragment('Hello', 'text/plain');

    const getExpandedRes = await request(app)
      .get(`/v1/fragments/BAD-ID`)
      .auth('user1@email.com', 'password1');

    expect(getExpandedRes.status).toBe(404);
  });

  test('create fragment of markdown type', async () => {
    const data = '## hello';

    const postRes = await postFragment(data, 'text/markdown');

    const fragment = postRes.body.fragment;

    const getRes = await request(app)
      .get(`/v1/fragments/${fragment.id}`)
      .auth('user1@email.com', 'password1');

    expect(getRes.status).toBe(200);
  });

  test('valid markdown to html conversion', async () => {
    const data = '## hello';

    const postRes = await postFragment(data, 'text/markdown');

    const fragment = postRes.body.fragment;

    const getRes = await request(app)
      .get(`/v1/fragments/${fragment.id}.html`)
      .auth('user1@email.com', 'password1');

    expect(getRes.text).toBe('<h2>hello</h2>\n');
    expect(getRes.status).toBe(200);
  });

  test('invalid markdown to jpeg conversion results in 415', async () => {
    const data = '## hello';

    const postRes = await postFragment(data, 'text/markdown');

    const fragment = postRes.body.fragment;

    const getRes = await request(app)
      .get(`/v1/fragments/${fragment.id}.jpg`)
      .auth('user1@email.com', 'password1');

    expect(getRes.status).toBe(415);
  });
});
