'use strict';

require('dotenv').config();

const knex = require('knex');
const app = require('./app');
if (process.env.NODE_ENV === 'production') {
  const pg = require('pg');
  pg.defaults.ssl = { rejectUnauthorized: false };
}
const { PORT, DATABASE_URL } = require('./config');

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
});

app.set('db', db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
