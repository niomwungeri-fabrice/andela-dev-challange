/* eslint-disable no-undef */
import moment from 'moment';
import chai from 'chai';
import chaiHttp from 'chai-http';
import uuidv4 from 'uuid/v4';
import app from '../server';
import Parcel from '../src/model/parcel';


chai.use(chaiHttp);
const invalidParcel = '6509a627-3e44-4285-ae0d-3466d5a50103';
let validParcelId = '';
const validUser = 'niomwungeri@gmail.com';
let userid = '';
let token = '';


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
describe('GET /api/v1/auth/login', () => {
  it('should return 400 - The credentials you provided is incorrect', (done) => {
    chai.request(app).post('/api/v1/auth/login').send({ email: '', password: '' }).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  it('should return 400 - User not found', (done) => {
    chai.request(app).post('/api/v1/auth/login').send({ email: 'niomwungderi', password: '123' }).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  it('should return 200 - Success', (done) => {
    chai.request(app).post('/api/v1/auth/login').send({ email: 'niomwungeri@gmail.com', password: '123' }).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(200);
      // eslint-disable-next-line prefer-destructuring
      token = res.body.token;
      done();
    });
  });
});
describe('GET /api/v1/users/:userId', () => {
  it('should return 200', (done) => {
    chai.request(app).get(`/api/v1/users/${validUser}`).set('x-access-token', token)
      .end((err, res) => {
        userid = res.body.data.id;
        done();
      });
  });
});
describe('POST /api/v1/parcels', () => {
  it('should return 201 - Create a parcel delivery order', (done) => {
    const newParcel = new Parcel(uuidv4(), 'Rwanda', 'Kenya', 'Rwanda', 4,
      userid, 'Pending', moment(new Date()), moment(new Date()));
    chai.request(app).post('/api/v1/parcels').set('x-access-token', token).send(newParcel)
      .end((error, response) => {
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
    chai.request(app).get('/api/v1/parcels').set('x-access-token', token).end((err, res) => {
      validParcelId = res.body.data[0].id;
      chai.expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
});
describe('PUT /api/v1/parcels/:parcelId/cancel', () => {
  it('should return 200 - Cancel the specific parcel delivery order', (done) => {
    chai.request(app).put(`/api/v1/parcels/${validParcelId}/cancel`)
      .set('x-access-token', token).end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(200);
        done();
      });
  });
  it('should return 404 - Cancel the specific parcel delivery order', (done) => {
    chai.request(app).put(`/api/v1/parcels/${invalidParcel}/cancel`)
      .set('x-access-token', token).end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(404);
        done();
      });
  });
});
describe('PUT /api/v1/parcels/:parcelId/presentLocation', () => {
  it('should return 200 - Change the present location of a specific parcel delivery order', (done) => {
    chai.request(app).put(`/api/v1/parcels/${validParcelId}/presentLocation`)
      .set('x-access-token', token).send({ presentLocation: 'Mombasa' })
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(200);
        done();
      });
  });
  it('should return 404 - Change the present location of a specific parcel delivery order', (done) => {
    chai.request(app).put(`/api/v1/parcels/${invalidParcel}/presentLocation`)
      .set('x-access-token', token).end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(404);
        done();
      });
  });
});

describe('PUT /api/v1/parcels/:parcelId/destination', () => {
  it('should return 200 - Change the location of a specific parcel delivery order', (done) => {
    chai.request(app).put(`/api/v1/parcels/${validParcelId}/destination`).set('x-access-token', token).send({ destination: 'Uganda' })
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(200);
        done();
      });
  });
  it('should return 404 - Change the location of a specific parcel delivery order', (done) => {
    chai.request(app).put(`/api/v1/parcels/${invalidParcel}/destination`).set('x-access-token', token)
      .send({ destination: 'Uganda' })
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(404);
        done();
      });
  });
});

describe('PUT /api/v1/parcels/:parcelId/status', () => {
  it('should return 404 - Change the status of a specific parcel delivery order', (done) => {
    chai.request(app).put(`/api/v1/parcels/${invalidParcel}/status`).set('x-access-token', token)
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(404);
        done();
      });
  });
  it('should return 200 - Change the status of a specific parcel delivery order', (done) => {
    chai.request(app).put(`/api/v1/parcels/${validParcelId}/status`)
      .set('x-access-token', token).send({ status: 'In Transit' })
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(200);
        done();
      });
  });
});
describe('GET /users/<userId>/parcels', () => {
  const invalidUserId = 'jkdfjkdkfj';
  it('should return 404 - Fetch all parcel delivery orders by a specific user', (done) => {
    chai.request(app).get(`/api/v1/users/${invalidUserId}/parcels`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  it('should return 200 - Fetch all parcel delivery orders by a specific user', (done) => {
    chai.request(app).get(`/api/v1/users/${userid}/parcels`).set('x-access-token', token).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
});
