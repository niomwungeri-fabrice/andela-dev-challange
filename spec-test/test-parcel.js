'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _server = require('../spec/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var newParcels = require('../spec/models/parcel'); /* eslint-disable no-undef */


_chai2.default.use(_chaiHttp2.default);

var parcel = {
  userId: 'niomwungeri',
  email: 'niomwungeri@gmail.com',
  from: 'Rwanda',
  to: 'Kenya',
  length: 45,
  width: 42,
  height: 2
};
describe('Parcels test Suite', function () {
  var fistId = void 0;
  before(function () {
    // runs before all tests in this block
    var newParcel = {
      parcelId: 'kbpc1us0k',
      userId: 'niomwungeri',
      email: 'niomwungeri@gmail.com',
      from: 'Rwanda',
      to: 'Kenya',
      length: 45,
      width: 42,
      height: 2,
      status: 'Pending'
    };
    fistId = newParcel.parcelId;
    newParcels.push(newParcel);
  });
  it('should return 404(NotFound) - SPECIFIC ID', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/parcels/' + newParcels.parcelId).end(function (err, res) {
      _chai2.default.expect(res.statusCode).to.be.equal(404);
      done();
    });
  });
  it('should return 200(Success) - SPECIFIC ID', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/parcels/' + fistId).end(function (err, res) {
      _chai2.default.expect(res.forbidden).to.be.eq(!true);
      done();
    });
  });
  it('should return 200(Found) - ALL PARCELS', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/parcels').end(function (err, res) {

      _chai2.default.expect(res.noContent).to.be.equal(false);
      done();
    });
  });
  it('should return 404(NotFound) - CANCEL', function (done) {
    _chai2.default.request(_server2.default).put('/api/v1/parcels/' + newParcels.parcelId + '/cancel').end(function (err, res) {
      _chai2.default.expect(res.badRequest).to.be.eq(false);
      done();
    });
  });
  it('should return 200(Success) - CANCEL', function (done) {
    _chai2.default.request(_server2.default).put('/api/v1/parcels/' + fistId + '/cancel').end(function (err, res) {
      _chai2.default.expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
  it('should return 200(NotFound) - CREATE PARCEL', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/parcels').send(parcel).end(function (err, res) {
      _chai2.default.expect(res.statusCode).to.be.eql(201);
      done();
    });
  });
  it('should return 404(NotFound) - CREATE PARCEL', function (done) {
    var parcels = {};
    _chai2.default.request(_server2.default).post('/api/v1/parcels/').send(parcels).end(function (err, res) {
      _chai2.default.expect(res.notAcceptable).to.be.equal(false);
      done();
    });
  });
  after(function () {
    newParcels = [];
  });
});