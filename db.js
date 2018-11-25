/* Code modified from a file obtained from https://www.codementor.io/olawalealadeusi896/building-a-simple-api-with-nodejs-expressjs-and-postgresql-db-masuu56t7 */
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_TEST,
});

pool.on('connect', () => {
  console.log('connected to the db');
});


const createParcel = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      parcels (
        id UUID PRIMARY KEY,
        location VARCHAR(128) NOT NULL,
        destination VARCHAR(128) NOT NULL,
        length INTEGER NOT NULL,
        width INTEGER NOT NULL,
        height INTEGER NOT NULL,
        owner_id UUID NOT NULL,
        status VARCHAR(128) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP,
        FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


const createUser = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY,
        email VARCHAR(128) UNIQUE NOT NULL,
        username VARCHAR(128) UNIQUE NOT NULL,
        first_name VARCHAR(128) NOT NULL,
        last_name VARCHAR(128) NOT NULL,
        user_role VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


const dropParcel = () => {
  const queryText = 'DROP TABLE IF EXISTS parcels returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropUser = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createParcel,
  createUser,
  dropParcel,
  dropUser,
};

require('make-runnable');
