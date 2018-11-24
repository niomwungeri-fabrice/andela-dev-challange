import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import Parcel from './src/controller/Parcel-controller';
import User from './src/controller/User-controller';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => res.status(200).send({ message: 'Welcome' }));

app.post('/api/v1/parcels', Parcel.create);
app.get('/api/v1/parcels', Parcel.getAll);
app.get('/api/v1/parcels/:parcelId', Parcel.getOne);
app.get('/api/v1/users/:userId/parcels', Parcel.parcelByUser);
app.put('/api/v1/parcels/:parcelId/cancel', Parcel.cancel);
app.delete('/api/v1/users/:userId/delete', User.delete);
app.put('/api/v1/parcels/:parcelId/presentLocation', Parcel.ChangePresentLocation);
app.put('/api/v1/parcels/:parcelId/destination', Parcel.changeDestination);
app.put('/api/v1/parcels/:parcelId/status', Parcel.changeStatus);
app.post('/api/v1/auth/signup', User.signup);
app.get('/api/v1/auth/login', User.login);

app.listen(port, () => console.log(`SendIT app listening on port ${port}!`));

export default app;
