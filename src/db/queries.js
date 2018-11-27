import execute from './index';
const sqlQueries = {};
// Create table for parcels
const createParcelsTable = `CREATE TABLE IF NOT EXISTS
parcels (
  id UUID PRIMARY KEY,
  location VARCHAR(128) NOT NULL,
  destination VARCHAR(128) NOT NULL,
  present_location VARCHAR(128),
  weight INTEGER NOT NULL,
  owner_id UUID NOT NULL,
  status VARCHAR(128) NOT NULL,
  created_date TIMESTAMP,
  modified_date TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
)`;

// Create users table
const createusersTable = `CREATE TABLE IF NOT EXISTS
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

if (require.main === module) {
  execute(createParcelsTable);
  execute(createusersTable);
}

// insert parcel into the database
const insertIntoDatabase = `INSERT INTO
                            parcels(id, location, destination ,present_location, weight, owner_id, status, created_date, modified_date)
                            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
                            returning *`;
// Pull out a prcel from a database
const getSpecificParcel = 'SELECT * FROM parcels WHERE owner_id = $1';

// Update status of a parcel
const statusUpdate = `UPDATE parcels
SET status=$1,modified_date=$2
WHERE id=$3 AND owner_id = $4 returning *`;

// update destination of a parcel
const destinationUpdate = `UPDATE parcels
SET destination=$1,modified_date=$2
WHERE id=$3 AND owner_id = $4 returning *`;

// update present location
const presentLocationUpdate = `UPDATE parcels
SET present_location=$1,modified_date=$2
WHERE id=$3 AND owner_id = $4 returning *`;


// register user
const registerUser = 'INSERT INTO users(id, email, username, first_name, last_name, user_role, password, created_date, modified_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *';

// Check if a user is logged in
const loggedInQuery = 'SELECT * FROM users WHERE email = $1';
