'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

require('babel-polyfill');

var _Parcels = require('./src/controller/Parcels');

var _Parcels2 = _interopRequireDefault(_Parcels);

var _Users = require('./src/controller/Users');

var _Users2 = _interopRequireDefault(_Users);

var _Auth = require('./src/middleware/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var app = (0, _express2.default)();
var port = process.env.PORT || 3000;

app.use(_express2.default.json());

app.get('/', function (req, res) {
  return res.status(200).send({ message: 'YAY! Congratulations! Your first endpoint is working' });
});

app.post('/api/v1/reflections', _Auth2.default.verifyToken, _Parcels2.default.create);
app.get('/api/v1/reflections', _Auth2.default.verifyToken, _Parcels2.default.getAll);
app.get('/api/v1/reflections/:id', _Auth2.default.verifyToken, _Parcels2.default.getOne);
app.put('/api/v1/reflections/:id', _Auth2.default.verifyToken, _Parcels2.default.update);
app.delete('/api/v1/reflections/:id', _Auth2.default.verifyToken, _Parcels2.default.delete);
app.post('/api/v1/users', _Users2.default.create);
app.post('/api/v1/users/login', _Users2.default.login);
app.delete('/api/v1/users/me', _Auth2.default.verifyToken, _Users2.default.delete);

app.listen(3000);
app.listen(port, function () {
  return console.log('SendIT app listening on port ' + port + '!');
});