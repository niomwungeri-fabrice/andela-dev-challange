/* eslint-disable no-undef */
import moment from 'moment';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import Parcel from '../src/model/parcel';

chai.use(chaiHttp);
// let newParcels = new Parcel('6509a627-3e44-4285-ae0d-3466d5a50103',
// 'Rwanda', 'Kenya', 42, 45, 33, '6509a627-3e44-4285-ae0d-3466d5a50105',
// moment(new Date()), moment(new Date()));
const invalidUser = '6509a627-3e44-4285-ae0d-3466d5a50103';
const validUser = '6509a627-3e44-4285-ae0d-3466d5a50105';
const validParcel = '0a092a42-c8c0-447a-b2d6-b3549a4f114d';
describe('Parcels test Suite', () => {
  before(() => {

  });
  it('should return 400(NotFound) - SPECIFIC ID', (done) => {
    chai.request(app).get(`/api/v1/parcels/${invalidUser}`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(404);
      done();
    });
  });
  it('should return 200(Success) - SPECIFIC ID', (done) => {
    chai.request(app).get(`/api/v1/parcels/${validParcel}`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
  // test 400
  it('should return 400(NotFound) - ALL PARCELS', (done) => {
    chai.request(app).get('/api/v1/parcels').end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
  it('should return 400(NotFound) - cancel', (done) => {
    chai.request(app).put(`/api/v1/parcels/${invalidUser}/cancel`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  it.skip('should return 200(Success) - Cancel', (done) => {
    chai.request(app).put(`/api/v1/parcels/${validUser}/cancel`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
  it.skip('should return 200(Found) - CREATE PARCEL', (done) => {
    chai.request(app).post('/api/v1/parcels').send(parcel).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(201);
      done();
    });
  });
  it('should return 400(NotFound) - CREATE PARCEL', (done) => {
    const parcels = {};
    chai.request(app).post('/api/v1/parcels/').send(parcels).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  // after(() => {
  // });
});
