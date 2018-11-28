import express from 'express';
import Auth from '../middleware/Auth';
import ParcelController from '../controller/ParcelController';
import UserControllers from '../controller/UserController';


const userRoute = express.Router();

userRoute.route('/delete')
  .delete(Auth.verifyToken, UserControllers.delete);

userRoute.route('/:userId')
  .get(Auth.verifyToken, UserControllers.userByEmail);

userRoute.route('/:userId/parcels')
  .get(Auth.verifyToken, ParcelController.parcelByUser);

export default userRoute;
