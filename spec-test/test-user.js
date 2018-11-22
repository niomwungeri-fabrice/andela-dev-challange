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
<<<<<<< HEAD:spec-test/test-user.js
      _chai2.default.expect(res.type).to.be.equal('application/json');
=======
      _chai2.default.expect(res.created).to.be.equal(false);
>>>>>>> ae0b0b23564de6e693b94a9a4ddba0bdc4d16487:dist-test/test-user.js
      done();
    });
  });
  it('should return 200(Success) status', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/users/' + validUser + '/parcels/').end(function (err, res) {
<<<<<<< HEAD:spec-test/test-user.js
      _chai2.default.expect(res.unprocessableEntity).to.be.equal(false);
=======
      _chai2.default.expect(res.status).to.be.equal(200);
      _chai2.default.expect(res.ok).to.be.equal(true);
      _chai2.default.expect(res.statusCode).to.be.equal(200);
>>>>>>> ae0b0b23564de6e693b94a9a4ddba0bdc4d16487:dist-test/test-user.js
      done();
    });
  });
});