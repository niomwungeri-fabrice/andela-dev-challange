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
<<<<<<< HEAD
      chai.expect(res.type).to.be.equal('application/json');
=======
      chai.expect(res.created).to.be.equal(false);
>>>>>>> ae0b0b23564de6e693b94a9a4ddba0bdc4d16487
      done();
    });
  });
  it('should return 200(Success) status', (done) => {
    chai.request(app).get(`/api/v1/users/${validUser}/parcels/`).end((err, res) => {
<<<<<<< HEAD
      chai.expect(res.unprocessableEntity).to.be.equal(false);
=======
      chai.expect(res.status).to.be.equal(200);
      chai.expect(res.ok).to.be.equal(true);
      chai.expect(res.statusCode).to.be.equal(200);
>>>>>>> ae0b0b23564de6e693b94a9a4ddba0bdc4d16487
      done();
    });
  });
});
