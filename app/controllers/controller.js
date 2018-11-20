const Joi = require('joi');

const parcels = require('../models/parcel.js');

const validateParcel = (parcel) => {
  const schema = {
    userId: Joi.string().min(4).required(),
    from: Joi.string().min(2).required(),
    to: Joi.string().min(2).required(),
    length: Joi.number().required(),
    width: Joi.number().required(),
    email: Joi.string().email({ minDomainAtoms: 2 }),
    height: Joi.number().required(),
  };
  return Joi.validate(parcel, schema);
};

exports.create = (req, res) => {
  const { error } = validateParcel(req.body);
  if (error) return res.status(404).json({ error: error.details[0].message });
  const parcel = {
    parcelId: Math.random().toString(36).substr(2, 9),
    userId: req.body.userId,
    email: req.body.email,
    from: req.body.from,
    to: req.body.to,
    length: req.body.length,
    width: req.body.width,
    height: req.body.height,
    status: 'Pending',
  };
  parcels.push(parcel);
  return res.status(201).json(parcel);
};

exports.findAll = (req, res) => {
  res.status(200).json(parcels);
};

exports.findOne = (req, res) => {
  const parcel = parcels.find(p => p.parcelId === req.params.parcelId);
  if (!parcel) return res.status(404).json({ ParcelNotFound: 'Parcel was not found' });
  return res.status(200).json(parcel);
};

exports.cancel = (req, res) => {
  const parcel = parcels.find(p => p.parcelId === req.params.parcelId);
  if (!parcel) {
    return res.status(404).json({ ParcelNotFound: `Parcel with this id > ${req.params.parcelId} < was not found` });
  } if (parcel.status === 'Cancelled') {
    return res.status(200).json({ Cancelled: 'Parcel Canceled already' });
  } if (parcel.status === 'Delivered') {
    return res.status(200).json({ Cancelled: 'Oops, We cant cancel this parece, Parcel already Delivered' });
  }
  parcel.status = 'Cancelled';
  return res.status(200).json(parcel);
};

exports.parcelByUser = (req, res) => {
  const user = parcels.find(u => u.userId === req.params.userId);
  const parcelPerUser = [];
  if (!user) {
    return res.status(404).json({ UserNotFound: 'User not found' });
  }
  parcels.forEach((item) => {
    if (item.userId === user.userId) parcelPerUser.push(item);
  });
  return res.status(200).json(parcelPerUser);
};
