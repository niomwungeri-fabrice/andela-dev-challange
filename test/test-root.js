/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';

const app = require('../spec/server');

chai.use(chaiHttp);

describe('Root Test Suites', () => {
  it('should return 200(success) status', (done) => {
    chai.request(app).get('/').end((err, res) => {
      chai.expect(res.body.message).to.be.eql('API root for SendIT application');
      done();
    });
  });
});
