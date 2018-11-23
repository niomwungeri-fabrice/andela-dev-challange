/* eslint-disable no-undef */
import moment from 'moment';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import Parcel from '../src/model/parcel';
import User from '../src/model/user'
import uuidv4 from 'uuid/v4'
import Helper from '../src/controller/Helper-controller';
import db from '../db';


chai.use(chaiHttp);
const invalidUser = '6509a627-3e44-4285-ae0d-3466d5a50103';
const validUser = '6509a627-3e44-4285-ae0d-3466d5a50105';
const validParcel = '0a092a42-c8c0-447a-b2d6-b3549a4f114d';

const createQueryUser = `INSERT INTO
users(id, email, username, first_name, last_name,user_role, password, created_date, modified_date)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
returning *`;

const createQueryParcel = `INSERT INTO
 parcels(id, location, destination, length, width, height, owner_id, status, created_date, modified_date)
 VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
 returning *`;


const signup = async () => {
  const newUser = new User(uuidv4(), 'niomwungeri.fabrice@gmail.com', 'niomwungeri', 'Fabrice', 
  'Niyiomwungeri', 'Admin', Helper.hashPassword('123'), moment(new Date()), moment(new Date()));
  const createQuery = `INSERT INTO
    users(id, email, username, first_name, last_name,user_role, password, created_date, modified_date)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
    returning *`;
  try {
    const { rows } = await db.query(createQuery, Object.values(newUser));
    return rows[0].id;
  } catch (error) {
    return error;
  }
};

console.log(signup());


describe('Create a parcel delivery order', async () => {
  it.skip('should return 200 - Create a parcel delivery order', (done) => {
    chai.request(app).post('/api/v1/parcels').send(newParcel).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(201);
      done();
    });
  });
  it.skip('should return 400 - Create a parcel delivery order', (done) => {
    const parcels = {};
    chai.request(app).post('/api/v1/parcels/').send(parcels).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  it.skip('should return 404 - Fetch a specific parcel delivery order', (done) => {
    chai.request(app).get(`/api/v1/parcels/${invalidUser}`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(404);
      done();
    });
  });
  it.skip('should return 200 - Fetch a specific parcel delivery order', (done) => {
    chai.request(app).get(`/api/v1/parcels/${validParcel}`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
  // test 400
  it.skip('should return 200 - Fetch all parcel delivery orders', (done) => {
    chai.request(app).get('/api/v1/parcels').end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
  it.skip('should return 404 - Cancel the specific parcel delivery order', (done) => {
    chai.request(app).put(`/api/v1/parcels/${invalidUser}/cancel`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(404);
      done();
    });
  });
  it.skip('should return 200 - Cancel the specific parcel delivery order', (done) => {
    chai.request(app).put(`/api/v1/parcels/${validParcel}/cancel`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
});
