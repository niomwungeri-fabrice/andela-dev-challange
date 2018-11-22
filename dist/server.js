'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create express app
var app = (0, _express2.default)();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(_express2.default.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(_express2.default.json());

var port = process.env.PORT || 3000;

// permissions
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  return next();
});

// root route
app.get('/', function (req, res) {
  return res.status(200).send({ message: 'API root for SendIT application' });
});
// calling other routes
require('../dist/routes/routes.js')(app);

module.exports = app;
// eslint-disable-next-line no-console
app.listen(port, function () {
  return console.log('SendIT app listening on port ' + port + '!');
});