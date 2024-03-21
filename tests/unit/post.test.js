const crypto = require('crypto');
const { postFragment } = require('../utils');

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
