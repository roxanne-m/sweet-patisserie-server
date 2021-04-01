'use strict';

const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Recipe endpoints', () => {
  let db;

  const { testUsers, testRecipes } = helpers.makeAllFixtures();
  const testUser = testUsers[0];

  before('Make the knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });
  after('disconnect from the database', () => db.destroy());

  before('clean the table', () => helpers.truncateAllTables(db));

  afterEach('cleanup', () => helpers.truncateAllTables(db));

  after(`Destroy the connection`, () => db.destroy());

  describe('GET /api/recipes', () => {
    context('Given there are no recipes', () => {
      beforeEach(`Seed user table before each test in this context`, () =>
        helpers.seedUsers(db, testUsers)
      );

      it(`GET /api/recipes responds with 200 and an empty array`, () => {
        return supertest(app)
          .get('/api/recipes')
          .set('Authorization', helpers.makeJWTAuthHeader(testUser))
          .expect(200, []);
      });
    });

    context('Given there are recipes in the database', () => {
      beforeEach(`Seed all tables before each test in this context`, () => {
        return helpers.seedAllTables(db, testUsers, testRecipes);
      });

      it('GET /api/recipes responds with 200 and all recipes', () => {
        return supertest(app)
          .get('/api/recipes')
          .set('Authorization', helpers.makeJWTAuthHeader(testUser))
          .expect(200, testRecipes);
      });
    });
  });
});
