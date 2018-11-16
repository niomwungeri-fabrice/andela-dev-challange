/* eslint-disable no-undef */
const request = require('request');

const basePoint = 'https://andela-dev-challenge.herokuapp.com';
// const basePoint = 'http://localhost:3000';

describe('API root for SendIT application', () => {
  it('GET /', (done) => {
    request.get(basePoint, (error, response, body) => {
      expect(body).toBe('API root for SendIT application');
      done();
    });
  }, 6000);
  it('GET /', (done) => {
    request.get(`${basePoint}/api/v1/parcels/99`, (error, response) => {
      expect(response.statusCode).toEqual(404);
      done();
    });
  }, 6000);
  it('GET /', (done) => {
    const parcelId = 1;
    request.get(`${basePoint}/api/v1/parcels/${parcelId}`, (error, response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  }, 6000);

  const user = 'niomwungeri';
  it('GET /', (done) => {
    request.get(`${basePoint}/api/v1/users/${user}/parcels`, (error, response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  }, 6000);
  it('should return 200 response code on POST', (done) => {
    request.post(`${basePoint}/api/v1/parcels`, {
      json: true,
      body: {
        userId: 'jimmy',
        from: 'Kenya',
        to: 'Uganda',
        length: 45,
        height: 1,
        width: 42,
      },
    }, (error, response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  }, 6000);
});
