/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../server');

chai.use(chaiHttp);

describe('Get api documentation', () => {
  it('should return 200(success) status', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(200);
        done();
      });
  });
});
