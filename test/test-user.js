/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);


describe('GET /api/v1/users', () => {
  const validUser = '25caef94-ad21-4745-be83-9a4af82934ae';
  const invalidUser = 'jkdfjkdkfj';
  it('should return 404 - Fetch all parcel delivery orders by a specific user', (done) => {
    chai.request(app).get(`/api/v1/users/${invalidUser}/parcels/`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  it.skip('should return 200 - Fetch all parcel delivery orders by a specific user', (done) => {
    chai.request(app).get(`/api/v1/users/${validUser}/parcels/`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
});

describe('POST /api/v1/auth/signup', () => {
  it('should return 400 - valid email address', (done) => {
    const newUser = {
      email: 'admin',
      firstName: 'admin',
      lastName: 'admin',
      userRole: 'admin',
      password: 'admin123',
      username: 'admin',
    };
    chai.request(app).post('/api/v1/auth/signup').send(newUser).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  it('should return 400 - Email and Password', (done) => {
    const newUser = {
      email: '',
      firstName: 'admin',
      lastName: 'admin',
      userRole: 'admin',
      password: '123',
      username: '',
    };
    chai.request(app).post('/api/v1/auth/signup').send(newUser).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  it.skip('should return 200 - Register a user', (done) => {
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
  it.skip('should return 200 - Check Unique', (done) => {
    const newUser = {
      email: 'niomwungeri@gmail.com',
      firstName: 'admin',
      lastName: 'admin',
      userRole: 'admin',
      password: '123',
      username: 'admin',
    };
    chai.request(app).post('/api/v1/auth/signup').send(newUser).end((err, res) => {
      chai.expect(res.body.routine).to.be.equal('_bt_check_unique');
      done();
    });
  });
});
describe('DELETE /api/v1/users/:userId/delete', () => {
  it.skip('should return 404 - User not found', (done) => {
    const email = '';
    chai.request(app).post(`/api/v1/users/${email}/delete`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(404);
      done();
    });
  });
  it.skip('should return 204 - Delete a user', (done) => {
    const email = 'niomwungeri@gmail.com';
    chai.request(app).delete(`/api/v1/users/${email}/delete`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(204);
      done();
    });
  });
});

describe('GET /api/v1/auth/login', () => {
  it.skip('should return 400 - The credentials you provided is incorrect', (done) => {
    chai.request(app).post('/api/v1/auth/login').end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  it.skip('should return 400 - User not found', (done) => {
    chai.request(app).post('/api/v1/auth/login').end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  it.skip('should return 200 - Success', (done) => {
    chai.request(app).post('/api/v1/auth/login').end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
});
