/* eslint-disable no-undef */
import moment from 'moment';
import chai from 'chai';
import chaiHttp from 'chai-http';
import uuidv4 from 'uuid/v4';
import app from '../server';
import Parcel from '../src/model/parcel';


chai.use(chaiHttp);
// eslint-disable-next-line no-unused-vars
const should = chai.should();
const invalidParcel = '6509a627-3e44-4285';
const correctParcelIdFormat = 'ae682c8a-16d4-4a49-9bed-f2114810efab';
let validParcelId = '';
const validUser = 'niomwungeri@gmail.com';
let userid = '';
let token = '';
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNTdlOGFkYi0wNjFjLTQ5OTgtYjlmOS05ZDlhZWMyMWU0MWMiLCJpYXQiOjE1NDM0MTEzMTksImV4cCI6MTU0NDAxNjExOX0.GJdPwQ0TCTu1PQrm5fagypveK1LEOqh25Kr3iDhMvZA';
const newParcel = new Parcel(uuidv4(), 'Rwanda', 'Kenya', 'Rwanda', 4,
  userid, '0487389934', 'Pending', moment(new Date()), moment(new Date()));


describe('POST /api/v1/auth/signup', () => {
  it('should return 201 - Register a user', (done) => {
    const newUser = {
      email: 'niomwungeri@gmail.com',
      firstName: 'admin',
      lastName: 'admin',
      userRole: 'admin',
      password: '123',
      username: 'admin',
    };
    chai.request(app).post('/api/v1/auth/signup').send(newUser).end((err, res) => {
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Account Created Successfully');
      res.body.data.should.have.property('first_name').eql('admin');
      done();
    });
  });
});
describe('GET /api/v1/auth/login', () => {
  it('should return 400 - The credentials you provided is incorrect', (done) => {
    chai.request(app).post('/api/v1/auth/login').send({ email: '', password: '' }).end((err, res) => {
      res.body.should.have.property('message').eql('Email and Password are required');
      res.should.have.status(400);
      done();
    });
  });
  it('should return 400 - User not found', (done) => {
    chai.request(app).post('/api/v1/auth/login').send({ email: 'niomwungderi', password: '123' }).end((err, res) => {
      res.body.should.have.property('message').eql('Please enter a valid email address');
      res.should.have.status(400);
      done();
    });
  });
  it('should return 200 - Success', (done) => {
    chai.request(app).post('/api/v1/auth/login').send({ email: 'niomwungeri@gmail.com', password: '123' }).end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('message').eql('Successfully logged in');
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
        res.should.have.status(200);
        res.body.data.username.length.should.be.eql(5);
        res.body.should.have.property('message').eql('Success');
        userid = res.body.data.id;
        done();
      });
  });
});
describe('POST /api/v1/parcels', () => {
  it('should return 201 - Create a parcel delivery order', (done) => {
    chai.request(app).post('/api/v1/parcels').set('x-access-token', token).send(newParcel)
      .end((error, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Parcel Created Successfully');
        res.body.data.should.have.property('location');
        res.body.data.should.have.property('destination');
        res.body.data.should.have.property('present_location');
        res.body.data.should.have.property('weight').equal(4);
        done();
      });
  });

  it('should return 400 - Create a parcel delivery order', (done) => {
    chai.request(app).post('/api/v1/parcels/').send(newParcel).end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('message').eql('Token is not provided');
      done();
    });
  });
  it('should return 400 - Create a parcel delivery order - invalid signature', (done) => {
    chai.request(app).post('/api/v1/parcels/').set('x-access-token', `${token}kdfe3`).send(newParcel)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('name').eql('JsonWebTokenError');
        res.body.should.have.property('message').eql('invalid signature');
        done();
      });
  });

  it('should return 400 - Create a parcel delivery order - The token you provided is invalid', (done) => {
    chai.request(app).post('/api/v1/parcels/').set('x-access-token', `${invalidToken}`).send(newParcel)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('The token you provided is invalid');
        done();
      });
  });
  it('should return 400 - Weight must be a number and greater than zero', (done) => {
    const parcels = { weight: -4 };
    chai.request(app).post('/api/v1/parcels/').set('x-access-token', token).send(parcels)
      .end((err, res) => {
        res.body.should.have.property('status').equal(400);
        done();
      });
  });
  it('should return 400 - location, destination, presentation location must be greater than 3 digits and phone number greater than 9', (done) => {
    const parcels = {
      weight: 8, location: 'Ke', presentLocation: 'Kigali', destination: 'Mombasa', receiverPhone: '0487389934',
    };
    chai.request(app).post('/api/v1/parcels/').set('x-access-token', token).send(parcels)
      .end((err, res) => {
        res.body.should.have.property('message').eql('location, destination, presentation location must be greater than 3 digits and phone number greater than 9');
        res.should.have.status(400);
        done();
      });
  });
});
describe('GET /api/v1/parcels/:parcelId', () => {
  it('should return 400 - Fetch all parcel delivery orders', (done) => {
    chai.request(app).get(`/api/v1/parcels/${invalidParcel}`).set('x-access-token', token).end((err, res) => {
      res.body.should.have.property('message').eql('Invalid Id');
      done();
    });
  });
});
describe('GET /api/v1/parcels', () => {
  it('should return 200 - Fetch all parcel delivery orders', (done) => {
    chai.request(app).get('/api/v1/parcels').set('x-access-token', token).end((err, res) => {
      res.body.should.have.property('message');
      res.body.should.have.status(200);
      validParcelId = res.body.data[0].id;
      done();
    });
  });
});
describe('PUT /api/v1/parcels/:parcelId/cancel', () => {
  it('should return 200 - Cancel the specific parcel delivery order', (done) => {
    chai.request(app).put(`/api/v1/parcels/${validParcelId}/cancel`)
      .set('x-access-token', token).end((err, res) => {
        res.body.data.should.have.property('status').eql('Cancelled');
        res.body.should.have.status(200);
        done();
      });
  });
  it('should return 400 - Cancel the specific parcel delivery order', (done) => {
    chai.request(app).put(`/api/v1/parcels/${correctParcelIdFormat}/cancel`)
      .set('x-access-token', token).end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.status(400);
        done();
      });
  });
  it('should return 400 - The parcel has been delived or concelled already, Cancel denied!', (done) => {
    chai.request(app).put(`/api/v1/parcels/${validParcelId}/cancel`)
      .set('x-access-token', token).end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.status(400);
        done();
      });
  });
});
describe('PUT /api/v1/parcels/:parcelId/presentLocation', () => {
  it('should return 200 - Change the present location of a specific parcel delivery order', (done) => {
    chai.request(app).put(`/api/v1/parcels/${validParcelId}/presentLocation`)
      .set('x-access-token', token).send({ presentLocation: 'Mombasa' })
      .end((err, res) => {
        res.body.data.should.have.property('present_location').eql('Mombasa');
        res.body.should.have.status(200);
        done();
      });
  });
  it('should return 400 - Change the present location of a specific parcel delivery order', (done) => {
    chai.request(app).put(`/api/v1/parcels/${correctParcelIdFormat}/presentLocation`)
      .set('x-access-token', token).end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.status(400);
        done();
      });
  });
});

describe('PUT /api/v1/parcels/:parcelId/destination', () => {
  it('should return 200 - Change the location of a specific parcel delivery order', (done) => {
    chai.request(app).put(`/api/v1/parcels/${validParcelId}/destination`).set('x-access-token', token).send({ destination: 'South Sudan' })
      .end((err, res) => {
        res.body.data.should.have.property('destination').eql('South Sudan');
        res.body.should.have.status(200);
        done();
      });
  });
  it('should return 400 - Change the location of a specific parcel delivery order', (done) => {
    chai.request(app).put(`/api/v1/parcels/${correctParcelIdFormat}/destination`).set('x-access-token', token)
      .send({ destination: 'Uganda' })
      .end((err, res) => {
        res.body.should.have.property('message');
        res.body.should.have.status(400);
        done();
      });
  });
});

describe('PUT /api/v1/parcels/:parcelId/status', () => {
  it('should return 200 - Change the status of a specific parcel delivery order', (done) => {
    chai.request(app).put(`/api/v1/parcels/${validParcelId}/status`)
      .set('x-access-token', token).send({ status: 'In Transit' })
      .end((err, res) => {
        res.body.data.should.have.property('status').eql('In Transit');
        res.body.should.have.status(200);
        done();
      });
  });
  it('should return 400 - Change the status of a specific parcel delivery order', (done) => {
    chai.request(app).put(`/api/v1/parcels/${correctParcelIdFormat}/status`).set('x-access-token', token)
      .end((err, res) => {
        res.body.should.have.property('message');
        res.body.should.have.status(400);
        done();
      });
  });
});
describe('GET /users/<userId>/parcels', () => {
  it('should return 200 - Fetch all parcel delivery orders by a specific user', (done) => {
    chai.request(app).get(`/api/v1/users/${userid}/parcels`).set('x-access-token', token).end((err, res) => {
      res.body.should.have.status(200);
      res.body.should.have.property('message').eql('Success');
      done();
    });
  });
});
