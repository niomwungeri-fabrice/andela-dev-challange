/* eslint-disable no-undef */
const request = require('request');

const basePoint = 'https://andela-dev-challenge.herokuapp.com';

// const basePoint = 'http://localhost:3000';

// root api
describe('API root for SendIT application', () => {
  it('should return => API root for SendIT application <=', (done) => {
    request.get(basePoint, (error, response, body) => {
      expect(body).toBe('API root for SendIT application');
      done();
    });
  }, 6000);
});

// create
describe('API root for SendIT application', () => {
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
    }, (_error, response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  }, 6000);
});
// findOne
describe('Test for Get one Parcel endPoint API', () => {
  const parcelId = 2;
  const notParcelId = 8894;
  it('should return 200 response code on GET', (done) => {
    request.get(`${basePoint}/api/v1/parcels/${parcelId}`, (error, response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  }, 6000);
  it('should return 404 response code on GET', (done) => {
    request.get(`${basePoint}/api/v1/parcels/${notParcelId}`, (error, response) => {
      expect(response.statusCode).toEqual(404);
      done();
    });
  }, 6000);
});

// parcelByUser
describe('Test for Get parcels by users endPoint API', () => {
  const user = 'niomwungeri';
  const notUser = 47473;
  it('should return 200 response code on GET', (done) => {
    request.get(`${basePoint}/api/v1/users/${user}/parcels`, (error, response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  }, 6000);
  it('should return 404 response code on GET', (done) => {
    request.get(`${basePoint}/api/v1/users/${notUser}/parcels`, (error, response) => {
      expect(response.statusCode).toEqual(404);
      done();
    });
  }, 6000);
});
// cancel
describe('Test for Cenceling the parcel', () => {
  const parcelId = 2;
  const notParcelId = 685;
  it('should return 200 response code on GET', (done) => {
    request.put(`${basePoint}/api/v1/parcels/${parcelId}/cancel`, (error, response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  }, 6000);
  it('should return 404 response code on GET', (done) => {
    request.put(`${basePoint}/api/v1/parcels/${notParcelId}/cancel`, (error, response) => {
      expect(response.statusCode).toEqual(404);
      done();
    });
  }, 6000);
});

// delete
describe('Test for deleting a parcel', () => {
  const parcelId = 2;
  const notParcelId = 84844;
  it('should return 200 response code on GET', (done) => {
    request.delete(`${basePoint}/api/v1/parcels/${parcelId}`, (error, response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  }, 6000);
  it('should return 404 response code on GET', (done) => {
    request.delete(`${basePoint}/api/v1/parcels/${notParcelId}`, (error, response) => {
      expect(response.statusCode).toEqual(404);
      done();
    });
  }, 6000);
});
