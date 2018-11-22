'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */
var app = require('../spec/server');

_chai2.default.use(_chaiHttp2.default);

describe('Root Test Suites', function () {
  it('should return 200(success) status', function (done) {
    _chai2.default.request(app).get('/').end(function (err, res) {
      _chai2.default.expect(res.body.message).to.be.eql('API root for SendIT application');
      done();
    });
  });
});