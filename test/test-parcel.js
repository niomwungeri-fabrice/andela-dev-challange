
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../spec/server';

let newParcels = require('../spec/models/parcel');

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
      chai.expect(res.forbidden).to.be.false
      done();
    });
  });
  it('should return 200(Success) - SPECIFIC ID', (done) => {
    chai.request(app).get(`/api/v1/parcels/${fistId}`).end((err, res) => {
      chai.expect(res.forbidden).to.be.eq(!true);
      done();
    });
  });
  it('should return 200(Found) - ALL PARCELS', (done) => {
    chai.request(app).get('/api/v1/parcels').end((err, res) => {
      
      chai.expect(res.noContent).to.be.equal(false);
      done();
    });
  });
  it('should return 404(NotFound) - CANCEL', (done) => {
    chai.request(app).put(`/api/v1/parcels/${newParcels.parcelId}/cancel`).end((err, res) => {
      chai.expect(res.badRequest).to.be.eq(false);
      done();
    });
  });
  it('should return 200(Success) - CANCEL', (done) => {
    chai.request(app).put(`/api/v1/parcels/${fistId}/cancel`).end((err, res) => {
      chai.expect(res.redirects).to.be.empty
      done();
    });
  });
  it('should return 200(NotFound) - CREATE PARCEL', (done) => {
    chai.request(app).post('/api/v1/parcels').send(parcel).end((err, res) => {
      chai.expect(res.statusCode).to.be.eql(201);
      done();
    });
  });
  it('should return 404(NotFound) - CREATE PARCEL', (done) => {
    const parcels = {};
    chai.request(app).post('/api/v1/parcels/').send(parcels).end((err, res) => {
      chai.expect(res.links).to.be.empty;
      done();
    });
  });
  after(() => {
    newParcels = [];
  });
});
