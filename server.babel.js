const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const parcels = [{
  parcelId: 1, userId: 'niomwungeri', from: 'Rwanda', to: 'Kenya', length: 45, width: 42, height: 2, status: 'In Transit',
}, {
  parcelId: 2, userId: 'admin', from: 'Rwanda', to: 'Uganda', length: 45, width: 42, height: 2, status: 'Pending',
}, {
  parcelId: 3, userId: 'niomwungeri', from: 'Uganda', to: 'Kenya', length: 45, width: 42, height: 2, status: 'Canceled',
}, {
  parcelId: 4, userId: 'admin', from: 'Rwanda', to: 'Somalia', length: 45, width: 42, height: 2, status: 'Pending',
}, {
  parcelId: 5, userId: 'clovis', from: 'RDC', to: 'Kenya', length: 45, width: 42, height: 2, status: 'Delivered',
}, {
  parcelId: 6, userId: 'caleb', from: 'Rwanda', to: 'Kenya', length: 45, width: 42, height: 2, status: 'Pick Up',
}, {
  parcelId: 7, userId: 'niomwungeri', from: 'Rwanda', to: 'Somalia', length: 45, width: 42, height: 2, status: 'Canceled',
}, {
  parcelId: 8, userId: 'caleb', from: 'Ethiopia', to: 'Kenya', length: 45, width: 42, height: 2, status: 'Pick Up',
}];

// permissions
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  return next();
});

// root
app.get('/', (req, res) => res.send('API root for SendIT application'));

// createParcel
app.post('/api/v1/parcels', (req, res) => {
  const parcel = {
    parcelId: parcels.length + 1,
    userId: req.body.userId,
    from: req.body.from,
    to: req.body.to,
    length: req.body.length,
    width: req.body.width,
    height: req.body.height,
    status: 'Pending',
  };
  parcels.push(parcel);
  res.send(parcel);
});
// findAll
app.get('/api/v1/parcels', (req, res) => {
  res.send(parcels);
});

// findByParcelID
app.get('/api/v1/parcels/:parcelId', (req, res) => {
  const parcel = parcels.find(p => p.parcelId === parseInt(req.params.parcelId, 10));
  if (!parcel) return res.status(404).send(`Parcel with this id >${req.params.parcelId}< was not found`);
  return res.send(parcel);
});
// findByUserID
app.get('/api/v1/users/:userId/parcels', (req, res) => {
  const user = parcels.find(u => u.userId === req.params.userId);
  const parcelPerUser = [];
  let results = {};
  if (!user) {
    results = res.send(404, 'user not found');
  } else {
    parcels.forEach((item) => {
      if (item.userId === user.userId) parcelPerUser.push(item);
    });
    results = parcelPerUser;
  }
  return res.send(results);
});

// cancel parcel
app.put('/api/v1/parcels/:parcelId/cancel', (req, res) => {
  const parcel = parcels.find(p => p.parcelId === parseInt(req.params.parcelId, 10));
  // if (!parcel) {
  //   return res.status(404).send(`Parcel with this id > ${req.params.parcelId} < was not found`);
  // } if (parcel.status === 'Canceled') {
  //   return res.status(200).send('Parcel Canceled already');
  // } if (parcel.status === 'Delivered') {
  //   return res.status(200).send("Oops, We can't cancel this parece, Parcel already Delivered");
  // }
  parcel.status = 'Canceled';
  return res.send(parcel);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
