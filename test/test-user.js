/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../server');

chai.use(chaiHttp);

// findOne
describe('Users Test Suites', () => {
  const invalUser = 'jfkdjfkd';
  it('should return 404(NotFound) status', (done) => {
    chai.request(app).get(`/api/v1/users/${invalUser}/parcels/`).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(404);
      done();
    });
  });
});
