/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
let token = '';
describe('POST /api/v1/auth/signup', () => {
  it('should return 200 - Success', (done) => {
    chai.request(app).post('/api/v1/auth/login').send({ email: 'niomwungeri@gmail.com', password: '123' }).end((err, res) => {
      res.body.should.have.status(200);
      res.body.should.have.property('message').equal('Successfully logged in');
      token = res.body.token;
      done();
    });
  });
  it('should return 400 - Email and Password are required', (done) => {
    const newUser = {
      email: '',
      firstName: 'admin',
      lastName: 'admin',
      userRole: 'admin',
      password: '123',
      username: '',
    };
    chai.request(app).post('/api/v1/auth/signup').set('x-access-token', token)
      .send(newUser)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.have.property('message').equal('Email and Password are required');
        done();
      });
  });
  it('should return 200 - Check Unique', (done) => {
    const newUser = {
      email: 'niomwungeri@gmail.com',
      firstName: 'admin',
      lastName: 'admin',
      userRole: 'admin',
      password: '123',
      username: 'admin',
    };
    chai.request(app).post('/api/v1/auth/signup').set('x-access-token', token).send(newUser)
      .set('x-access-token', token)
      .end((err, res) => {
        res.body.should.have.property('routine').equal('_bt_check_unique');
        done();
      });
  });
});


describe('DELETE /api/v1/users/:userId/delete', () => {
  it('should return 404 - User not found', (done) => {
    const email = '';
    chai.request(app).delete(`/api/v1/users/${email}/delete`).set('x-access-token', token).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(404);
      res.body.should.be.a('object');
      done();
    });
  });
  it('should return 204 - User found', (done) => {
    chai.request(app).delete('/api/v1/users/delete').set('x-access-token', token).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(204);
      res.body.should.be.a('object');
      done();
    });
  });
});
