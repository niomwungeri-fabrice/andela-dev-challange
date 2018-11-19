const parcels = require('../models/parcel.js');

exports.create = (req, res) => {
  const parcel = {
    parcelId: Math.random().toString(36).substr(2, 9),
    userId: req.body.userId,
    from: req.body.from,
    to: req.body.to,
    length: req.body.length,
    width: req.body.width,
    height: req.body.height,
    status: 'Pending',
  };
  parcels.push(parcel);
  res.status(201).send(parcel);
};

exports.findAll = (req, res) => {
  res.status(200).send(parcels);
};

exports.findOne = (req, res) => {
  const parcel = parcels.find(p => p.parcelId === req.params.parcelId);
  if (!parcel) return res.status(404).send(`Parcel with this id >${req.params.parcelId}< was not found`);
  return res.status(200).send(parcel);
};

exports.cancel = (req, res) => {
  const parcel = parcels.find(p => p.parcelId === req.params.parcelId);
  if (!parcel) {
    return res.status(404).send(`Parcel with this id > ${req.params.parcelId} < was not found`);
  } if (parcel.status === 'Canceled') {
    return res.status(200).send('Parcel Canceled already');
  } if (parcel.status === 'Delivered') {
    return res.status(200).send('Oops, We cant cancel this parece, Parcel already Delivered');
  }
  parcel.status = 'Canceled';
  return res.status(200).send(parcel);
};

exports.parcelByUser = (req, res) => {
  const user = parcels.find(u => u.userId === req.params.userId);
  const parcelPerUser = [];
  if (!user) {
    return res.status(404).send('user not found');
  }
  parcels.forEach((item) => {
    if (item.userId === user.userId) parcelPerUser.push(item);
  });
  return res.status(200).send(parcelPerUser);
};

exports.delete = (req, res) => {
  const parcel = parcels.find(p => p.parcelId === req.params.parcelId);
  if (!parcel) return res.status(404).send('Parcel not found');
  const index = parcels.indexOf(parcel);
  parcels.splice(index, 1);
  return res.status(200).send(parcel);
};

exports.update = (req, res) => {
  const parcel = parcels.find(p => p.parcelId === req.params.parcelId);
  if (!parcel) return res.status(404).send('Parcel not found');
  parcel.to = req.body.to;
  parcel.status = req.body.status;
  return res.status(200).send(parcel);
};
