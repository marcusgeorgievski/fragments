const {
  listFragments,
  writeFragment,
  readFragment,
  writeFragmentData,
  readFragmentData,
  deleteFragment,
} = require('../../src/model/data/memory/index');

describe('business logic', () => {
  test('writeFragment() returns undefined', async () => {
    let fragment = {
      ownerId: 'a',
      id: '1',
      data: 'c',
    };

    expect(await writeFragment(fragment)).toBe(undefined);
  });

  test('writeFragment() works buffers', async () => {
    let fragment = {
      ownerId: 'a',
      id: '2',
      data: Buffer.from([1, 2, 3]),
    };

    expect(await writeFragment(fragment)).toBe(undefined);
  });

  test('readFragment() returns correct fragment', async () => {
    let fragment = {
      ownerId: 'a',
      id: '2',
      data: Buffer.from([1, 2, 3]),
    };

    expect(await readFragment('a', '2')).toEqual(fragment);
  });

  test('readFragment() returns non-existant fragment as undefined', async () => {
    expect(await readFragment('zz', 'b')).toEqual(undefined);
  });

  test('writeFragmentsData() returns undefined, readFragmentData() returns new fragment', async () => {
    expect(await writeFragmentData('a', '2', Buffer.from([1, 2, 3, 4]))).toEqual(undefined);
    expect(await readFragmentData('a', '2')).toEqual(Buffer.from([1, 2, 3, 4]));
  });

  test('listFragments() for non-existant user returns empty array', async () => {
    expect(await listFragments('user123')).toEqual([]);
  });

  test("listFragments() returns correct id's for existing test user", async () => {
    expect(await listFragments('a')).toEqual(['1', '2']);
  });
  test('listFragments() returns correct expanded list of existing test user fragments', async () => {
    let f1 = {
      ownerId: 'a',
      id: '1',
      data: 'c',
    };
    let f2 = {
      ownerId: 'a',
      id: '2',
      data: Buffer.from([1, 2, 3]),
    };
    expect(await listFragments('a', true)).toEqual([f1, f2]);
  });

  test('listFragments() returns non-empty and list of length 2 for existing user', async () => {
    let results = await listFragments('a');
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toEqual(2);
  });

  test('correctly read existing fragment, delete, then read it as undefined', async () => {
    let fragment = {
      ownerId: 'a',
      id: '2',
      data: Buffer.from([1, 2, 3]),
    };

    expect(await readFragment('a', '2')).toEqual(fragment);
    expect(await deleteFragment('a', '2')).toEqual([undefined, undefined]);
    expect(await readFragment('a', '2')).toEqual(undefined);
  });
});
