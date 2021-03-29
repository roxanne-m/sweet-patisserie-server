'use strict';

const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Entry endpoints', () => {
  let db;

  const { testUsers } = helpers.makeUsersArray();
  const testUser = testUsers[0];
  const { testRecipes } = helpers.makeRecipesArray();
  const testRecipe = testRecipes[0];

  before('Make the knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });
  after('disconnect from the database', () => db.destroy());

  before('clean the table', () => helpers.cleanTables());

  afterEach('cleanup', () => helpers.cleanTables());

  describe('GET /api/recipes', () => {
    context('given there are no entries', () => {
      it('returns a 200 and an empty array', () => {
        return supertest(app)
          .get('/api/entry')
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .expect(200, []);
      });
    });

    context('given there are entries', () => {
      beforeEach('add recipes', () => {
        return db.into('new_recipe').insert(testRecipes);
      });

      it('returns a 200 and all recipes', () => {
        return supertest(app).get('/api/recipes').expect(200, testRecipes);
      });
    });
  });
});
