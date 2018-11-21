'use strict';

var _controller = require('../controllers/controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {
  app.post('/api/v1/parcels', _controller2.default.create);
  app.get('/api/v1/parcels', _controller2.default.findAll);
  app.get('/api/v1/parcels/:parcelId', _controller2.default.findOne);
  app.get('/api/v1/users/:userId/parcels', _controller2.default.parcelByUser);
  app.put('/api/v1/parcels/:parcelId/cancel', _controller2.default.cancel);
};