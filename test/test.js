/* eslint-disable no-undef */
const { expect } = require('chai');
const request = require('request');


// const basePoint = 'https://andela-dev-challenge.herokuapp.com';

const basePoint = 'http://localhost:3000';

describe('API root for SendIT application', () => {
  it('should return => API root for SendIT application <=', (done) => {
    request.get(basePoint, (error, response, body) => {
      expect(body).to.equal('API root for SendIT application');
      done();
    });
  });
  it('should return 200', (done) => {
    request.get(basePoint, (error, response) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

// findOne
describe('Test for Get one Parcel endPoint API', () => {
  const parcelId = 2;
  const invalidParcelId = 8894;
  it('should return 404 response code on GET', (done) => {
    request.get(`${basePoint}/api/v1/parcels/${parcelId}`, (error, response) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
  it('should return 404 response code on GET', (done) => {
    request.get(`${basePoint}/api/v1/parcels/${invalidParcelId}`, (error, response) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});

// parcelByUser
describe('Test for Get parcels by users endPoint API', () => {
  const user = 'niomwungeri';
  const invalidUserId = 47473;
  it('should return 404 response code on GET', (done) => {
    request.get(`${basePoint}/api/v1/users/${user}/parcels`, (error, response) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
  it('should return 404 response code on GET', (done) => {
    request.get(`${basePoint}/api/v1/users/${invalidUserId}/parcels`, (error, response) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});
// cancel
describe('Test for Cenceling the parcel', () => {
  const parcelId = 2;
  const invalidParcelId = 685;
  it('should return 404 response code on GET', (done) => {
    request.put(`${basePoint}/api/v1/parcels/${parcelId}/cancel`, (error, response) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
  it('should return 404 response code on GET', (done) => {
    request.put(`${basePoint}/api/v1/parcels/${invalidParcelId}/cancel`, (error, response) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});
// delete
describe('Test for deleting a parcel', () => {
  const invalidParcelId = 97978;
  it('should return 404 response code on GET', (done) => {
    request.delete(`${basePoint}/api/v1/parcels/${invalidParcelId}`, (error, response) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});
