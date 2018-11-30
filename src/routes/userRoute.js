import express from 'express';
import Auth from '../middleware/Authentication';
import ParcelController from '../controller/ParcelController';
import UserControllers from '../controller/UserController';
import Helper from '../controller/HelperController';


const userRoute = express.Router();

userRoute.route('/delete')
  .delete(UserControllers.delete);

userRoute.route('/:userId')
  .get(UserControllers.userByEmail);

userRoute.route('/:userId/parcels')
  .get(ParcelController.parcelByUser);
userRoute.route('/update')
  .put(Helper.validateUserRole, UserControllers.updateUser);

export default userRoute;
