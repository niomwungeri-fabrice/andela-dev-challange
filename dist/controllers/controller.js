'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _parcel = require('../models/parcel');

var _parcel2 = _interopRequireDefault(_parcel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateParcel = function validateParcel(parcel) {
  var schema = {
    userId: _joi2.default.string().min(4).required(),
    from: _joi2.default.string().min(2).required(),
    to: _joi2.default.string().min(2).required(),
    length: _joi2.default.number().required(),
    width: _joi2.default.number().required(),
    email: _joi2.default.string().email({ minDomainAtoms: 2 }),
    height: _joi2.default.number().required()
  };
  return _joi2.default.validate(parcel, schema);
};

exports.create = function (req, res) {
  var _validateParcel = validateParcel(req.body),
      error = _validateParcel.error;

  if (error) return res.status(404).json({ error: error.details[0].message });
  var parcel = {
    parcelId: Math.random().toString(36).substr(2, 9),
    userId: req.body.userId,
    email: req.body.email,
    from: req.body.from,
    to: req.body.to,
    length: req.body.length,
    width: req.body.width,
    height: req.body.height,
    status: 'Pending'
  };
  _parcel2.default.push(parcel);
  return res.status(201).json(parcel);
};

exports.findAll = function (req, res) {
  res.status(200).json(_parcel2.default);
};

exports.findOne = function (req, res) {
  var parcel = _parcel2.default.find(function (p) {
    return p.parcelId === req.params.parcelId;
  });
  if (!parcel) return res.status(404).json({ ParcelNotFound: 'Parcel was not found' });
  return res.status(200).json(parcel);
};

exports.cancel = function (req, res) {
  var parcel = _parcel2.default.find(function (p) {
    return p.parcelId === req.params.parcelId;
  });
  if (!parcel) {
    return res.status(404).json({ ParcelNotFound: 'Parcel with this id > ' + req.params.parcelId + ' < was not found' });
  }if (parcel.status === 'Cancelled') {
    return res.status(200).json({ Cancelled: 'Parcel Canceled already' });
  }if (parcel.status === 'Delivered') {
    return res.status(200).json({ Cancelled: 'Oops, We cant cancel this parece, Parcel already Delivered' });
  }
  parcel.status = 'Cancelled';
  return res.status(200).json(parcel);
};

exports.parcelByUser = function (req, res) {
  var user = _parcel2.default.find(function (u) {
    return u.userId === req.params.userId;
  });
  var parcelPerUser = [];
  if (!user) {
    return res.status(404).json({ UserNotFound: 'User not found' });
  }
  _parcel2.default.forEach(function (item) {
    if (item.userId === user.userId) parcelPerUser.push(item);
  });
  return res.status(200).json(parcelPerUser);
};