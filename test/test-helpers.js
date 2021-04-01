'use strict';
const knex = require('knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * create a knex instance connected to postgres
 * @returns {knex instance}
 */
function makeKnexInstance() {
  return knex({
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
  });
}

/**
 * create a knex instance connected to postgres
 * @returns {array} of user objects
 */
function makeUsersArray() {
  return [
    {
      user_id: 1,
      username: 'test-user-1',
      name: 'Test user 1',
      password: 'password',
    },
    {
      user_id: 2,
      username: 'test-user-2',
      name: 'Test user 2',
      password: 'password',
    },
  ];
}

function makeRecipesArray() {
  return [
    {
      new_recipe_id: 1,
      title: 'Lemon squares',
      description: 'description for recipe 1',
      user_id: 1,
    },
    {
      new_recipe_id: 2,
      title: 'Coconut macaroons',
      description: 'description for recipe 2',
      user_id: 1,
    },
    {
      new_recipe_id: 3,
      title: 'Chocolate croissant',
      description: 'description for recipe 3',
      user_id: 2,
    },
    {
      new_recipe_id: 4,
      title: 'Cream Eclair',
      description: 'description for recipe 4',
      user_id: 2,
    },
  ];
}

function makeAllFixtures() {
  const testUsers = makeUsersArray();
  const testRecipes = makeRecipesArray();

  return {
    testUsers,
    testRecipes,
  };
}

/**
 * insert users into db with bcrypted passwords and update sequence
 * @param {knex instance} db
 * @param {array} users - array of user objects for insertion
 * @param {array} recipes - array of recipe objects for insertion
 * @returns {Promise} - when users table seeded
 */
async function seedUsers(db, users) {
  const preppedUsers = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1),
  }));
  return db.transaction(async (trx) => {
    await trx.into('create_user').insert(preppedUsers);

    await trx.raw(`SELECT setval('create_user_user_id_seq', ?)`, [
      users[users.length - 1].user_id,
    ]);
  });
}

function seedAllTables(db, users, recipes) {
  return db.transaction(async (trx) => {
    await seedUsers(trx, users);
    await trx('new_recipe').insert(recipes);
    await trx.raw(`SELECT setval('new_recipe_new_recipe_id_seq', ?)`, [
      recipes[recipes.length - 1].new_recipe_id,
    ]);
  });
}

// cleans/truncates tables
function truncateAllTables(db) {
  return db.raw(`TRUNCATE create_user, new_recipe RESTART IDENTITY CASCADE;`);
}

// Function to create auth token
function makeJWTAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.user_id }, secret, {
    subject: user.username,
    algorithm: 'HS256',
  });

  return `Bearer ${token}`;
}

module.exports = {
  makeKnexInstance,
  makeUsersArray,
  makeRecipesArray,
  makeAllFixtures,

  seedUsers,
  seedAllTables,
  truncateAllTables,
  makeJWTAuthHeader,
};
