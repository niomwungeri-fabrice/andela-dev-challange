import parcels from '../controllers/controller';

module.exports = (app) => {
  app.post('/api/v1/parcels', parcels.create);
  app.get('/api/v1/parcels', parcels.findAll);
  app.get('/api/v1/parcels/:parcelId', parcels.findOne);
  app.get('/api/v1/users/:userId/parcels', parcels.parcelByUser);
  app.put('/api/v1/parcels/:parcelId/cancel', parcels.cancel);
};
