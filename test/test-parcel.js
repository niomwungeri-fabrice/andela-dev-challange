/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../server');
let newParcels = require('../app/models/parcel');

chai.use(chaiHttp);

const parcel = {
  userId: 'niomwungeri',
  email: 'niomwungeri@gmail.com',
  from: 'Rwanda',
  to: 'Kenya',
  length: 45,
  width: 42,
  height: 2,
};
describe('Parcels test Suite', () => {
  let fistId;
  before(() => {
    // runs before all tests in this block
    const newParcel = {
      parcelId: 'kbpc1us0k',
      userId: 'niomwungeri',
      email: 'niomwungeri@gmail.com',
      from: 'Rwanda',
      to: 'Kenya',
      length: 45,
      width: 42,
      height: 2,
      status: 'Pending',
    };
    fistId = newParcel.parcelId;
    newParcels.push(newParcel);
  });
  it('should return 404(NotFound) - SPECIFIC ID', (done) => {
    chai.request(app).get(`/api/v1/parcels/${newParcels.parcelId}`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(404);
      done();
    });
  });
  it('should return 200(Success) - SPECIFIC ID', (done) => {
    chai.request(app).get(`/api/v1/parcels/${fistId}`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(200);
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
    chai.request(app).put(`/api/v1/parcels/${newParcels.parcelId}/cancel`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(404);
      done();
    });
  });
  it('should return 200(Success) - CANCEL', (done) => {
    chai.request(app).put(`/api/v1/parcels/${fistId}/cancel`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
  it('should return 200(NotFound) - CREATE PARCEL', (done) => {
    chai.request(app).post('/api/v1/parcels').send(parcel).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(201);
      done();
    });
  });
  it('should return 404(NotFound) - CREATE PARCEL', (done) => {
    const parcels = {};
    chai.request(app).post('/api/v1/parcels/').send(parcels).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(404);
      done();
    });
  });
  after(() => {
    newParcels = [];
  });
});
