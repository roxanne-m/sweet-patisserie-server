'use strict';
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Protected Endpoints', function () {
  let db;

  const testUsers = helpers.makeUsersArray();
  const [testUser] = testUsers;

  before('make knex instance', () => {
    db = helpers.makeKnexInstance();
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('clean the table', () => helpers.truncateAllTables(db));

  afterEach('cleanup', () => helpers.truncateAllTables(db));

  beforeEach('insert users', () => {
    return helpers.seedUsers(db, testUsers);
  });

  const protectedEndpoints = [
    {
      name: 'GET /api/recipes',
      path: '/api/recipes/',
      method: supertest(app).get,
    },

    {
      name: 'PUT /api/auth/token',
      path: '/api/auth/token',
      method: supertest(app).put,
    },
  ];

  protectedEndpoints.forEach((endpoint) => {
    describe(endpoint.name, () => {
      it(`responds 401 'Missing bearer token' when no bearer token`, () => {
        return endpoint
          .method(endpoint.path)
          .expect(401, { error: `Missing bearer token` });
      });

      it(`responds 401 'Unauthorized request' when invalid JWT secret`, () => {
        const validUser = testUsers[0];
        const invalidSecret = 'bad-secret';
        return endpoint
          .method(endpoint.path)
          .set(
            'Authorization',
            helpers.makeJWTAuthHeader(validUser, invalidSecret)
          )
          .expect(401, { error: `Unauthorized request` });
      });

      it(`responds 401 'Unauthorized request' when invalid sub in payload`, () => {
        const invalidUser = { username: 'user-not-existy', id: 1 };
        return endpoint
          .method(endpoint.path)
          .set('Authorization', helpers.makeJWTAuthHeader(invalidUser))
          .expect(401, { error: `Unauthorized request` });
      });
    });
  });
});
