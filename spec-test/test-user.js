'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _server = require('../spec/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

// findOne
/* eslint-disable no-undef */
describe('Users Test Suites', function () {
  var validUser = 'niomwungeri';
  var invalidUser = 'jkdfjkdkfj';
  it('should return 404(NotFound) status', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/users/' + invalidUser + '/parcels/').end(function (err, res) {
      _chai2.default.expect(res.type).to.be.equal('application/json');
      done();
    });
  });
  it('should return 200(Success) status', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/users/' + validUser + '/parcels/').end(function (err, res) {
      _chai2.default.expect(res.unprocessableEntity).to.be.equal(false);
      done();
    });
  });
});