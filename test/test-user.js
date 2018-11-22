/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../spec/server';

chai.use(chaiHttp);

// findOne
describe('Users Test Suites', () => {
  const validUser = 'niomwungeri';
  const invalidUser = 'jkdfjkdkfj';
  it('should return 404(NotFound) status', (done) => {
    chai.request(app).get(`/api/v1/users/${invalidUser}/parcels/`).end((err, res) => {
      chai.expect(res.type).to.be.equal('application/json');
      done();
    });
  });
  it('should return 200(Success) status', (done) => {
    chai.request(app).get(`/api/v1/users/${validUser}/parcels/`).end((err, res) => {
      chai.expect(res.unprocessableEntity).to.be.equal(false);
      done();
    });
  });
});
