/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';

const app = require('../dist/server');

chai.use(chaiHttp);

describe('Root Test Suites', () => {
  it('should return 200(success) status', (done) => {
    chai.request(app).get('/').end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
});
