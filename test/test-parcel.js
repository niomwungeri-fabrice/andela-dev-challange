/* eslint-disable no-undef */
import moment from 'moment';
import chai from 'chai';
import chaiHttp from 'chai-http';
import uuidv4 from 'uuid/v4';
import app from '../server';
import Parcel from '../src/model/parcel';


chai.use(chaiHttp);
const invalidParcel = '6509a627-3e44-4285-ae0d-3466d5a50103';
const validParcelId = uuidv4();
const validUser = 'niomwungeri@gmail.com';
let userid = '';


describe('POST /api/v1/auth/signup', () => {
  it('should return 200 - Register a user', (done) => {
    const newUser = {
      email: 'niomwungeri@gmail.com',
      firstName: 'admin',
      lastName: 'admin',
      userRole: 'admin',
      password: '123',
      username: 'admin',
    };
    chai.request(app).post('/api/v1/auth/signup').send(newUser).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(201);
      done();
    });
  });
});
describe('GET /api/v1/users/:userId', () => {
  it('should return 200', (done) => {
    chai.request(app).get(`/api/v1/users/${validUser}`).end((err, res) => {
      userid = res.body.data.id;
      done();
    });
  });
});
describe('POST /api/v1/parcels', () => {
  it('should return 201 - Create a parcel delivery order', (done) => {
    const newParcel = new Parcel(validParcelId, 'Rwanda', 'Kenya', 4, 5, 5,
      userid, 'Pending', moment(new Date()), moment(new Date()));
    console.log(validParcelId);
    chai.request(app).post('/api/v1/parcels').send(newParcel).end((error, response) => {
      chai.expect(response.statusCode).to.be.equal(201);
      done();
    });
  });

  it('should return 400 - Create a parcel delivery order', (done) => {
    const parcels = {};
    chai.request(app).post('/api/v1/parcels/').send(parcels).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
});
describe('GET /api/v1/parcels', () => {
  it('should return 200 - Fetch all parcel delivery orders', (done) => {
    chai.request(app).get('/api/v1/parcels').end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
});
describe('PUT /api/v1/parcels/:parcelId/cancel', () => {
  // first fetch fist record and test after
  it.skip('should return 200 - Cancel the specific parcel delivery order', (done) => {
    chai.request(app).put(`/api/v1/parcels/${validParcelId}/cancel`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
  it('should return 404 - Cancel the specific parcel delivery order', (done) => {
    chai.request(app).put(`/api/v1/parcels/${invalidParcel}/cancel`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(404);
      done();
    });
  });
});
describe('PUT /api/v1/parcels/:parcelId/presentLocation', () => {
  it('should return 200 - Change the present location of a specific parcel delivery order', (done) => {
    chai.request(app).put(`/api/v1/parcels/${invalidParcel}/presentLocation`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
  it.skip('should return 404 - Change the present location of a specific parcel delivery order', (done) => {
    chai.request(app).put(`/api/v1/parcels/${invalidParcel}/presentLocation`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(404);
      done();
    });
  });
});

describe('PUT /api/v1/parcels/:parcelId/destination', () => {
  it('should return 200 - Change the location of a specific parcel delivery order', (done) => {
    chai.request(app).put(`/api/v1/parcels/${invalidParcel}/destination`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
  it.skip('should return 404 - Change the location of a specific parcel delivery order', (done) => {
    chai.request(app).put(`/api/v1/parcels/${invalidParcel}/destination`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(404);
      done();
    });
  });
});

describe('PUT /api/v1/parcels/:parcelId/status', () => {
  it('should return 404 - Change the status of a specific parcel delivery order', (done) => {
    chai.request(app).put(`/api/v1/parcels/${invalidParcel}/status`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(404);
      done();
    });
  });
  it.skip('should return 200 - Change the status of a specific parcel delivery order', (done) => {
    chai.request(app).put(`/api/v1/parcels/${validParcel}/status`).send({ status: 'In Transit' }).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
});
