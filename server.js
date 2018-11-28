import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import Parcel from './src/controller/ParcelController';
import User from './src/controller/UserController';
import Auth from './src/middleware/Auth';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => res.status(200).send({ message: 'Welcome to home SendIT API', status: 200 }));

app.get('/api/v1/parcels', Auth.verifyToken, Parcel.getAll);
app.get('/api/v1/parcels/:parcelId', Auth.verifyToken, Parcel.getOne);
app.get('/api/v1/users/:userId/parcels', Auth.verifyToken, Parcel.parcelByUser);
app.get('/api/v1/users/:userId', Auth.verifyToken, User.userByEmail);
app.put('/api/v1/parcels/:parcelId/cancel', Auth.verifyToken, Parcel.cancel);
app.put('/api/v1/parcels/:parcelId/presentLocation', Auth.verifyToken, Parcel.ChangePresentLocation);
app.put('/api/v1/parcels/:parcelId/destination', Auth.verifyToken, Parcel.changeDestination);
app.put('/api/v1/parcels/:parcelId/status', Auth.verifyToken, Parcel.changeStatus);
app.post('/api/v1/parcels', Auth.verifyToken, Parcel.create);
app.post('/api/v1/auth/signup', User.signup);
app.post('/api/v1/auth/login', User.login);
app.delete('/api/v1/users/delete', Auth.verifyToken, User.delete);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`SendIT app listening on port ${port}!`));

export default app;
