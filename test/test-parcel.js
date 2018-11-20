/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../server');

chai.use(chaiHttp);

describe('Parcels test Suite', () => {
  const invalId = 57;
  it('should return 404(NotFound) - SPECIFIC ID', (done) => {
    chai.request(app).get(`/api/v1/parcels/${invalId}`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(404);
      done();
    });
  });
  it('should return 400(NotFound) - ALL PARCELS', (done) => {
    chai.request(app).get('/api/v1/parcels').end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
  it('should return 404(NotFound) - CANCEL', (done) => {
    chai.request(app).put(`/api/v1/parcels/${invalId}/cancel`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(404);
      done();
    });
  });
  it('should return 201 - CREATE PARCEL', (done) => {
    const parcel = {
      userId: 'niomwungeri',
      email: 'niomwungeri@gmail.com',
      from: 'Rwanda',
      to: 'Kenya',
      length: 45,
      width: 42,
      height: 2,
    };
    chai.request(app).post('/api/v1/parcels').send(parcel).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(201);
      done();
    });
  });
  it('should return 404(NotFound) - NEW PARCEL', (done) => {
    const parcels = {};
    chai.request(app).post('/api/v1/parcels/').send(parcels).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(404);
      done();
    });
  });
});
