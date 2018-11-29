import express from 'express';
import Auth from '../middleware/Authentication';
import ParcelController from '../controller/ParcelController';
import UserControllers from '../controller/UserController';
import Helper from '../controller/HelperController';


const userRoute = express.Router();

userRoute.route('/delete')
  .delete(Auth.verifyToken, UserControllers.delete);

userRoute.route('/:userId')
  .get(Auth.verifyToken, UserControllers.userByEmail);

userRoute.route('/:userId/parcels')
  .get(Auth.verifyToken, ParcelController.parcelByUser);
userRoute.route('/update')
  .put(Helper.validateUserRole, Auth.verifyToken, UserControllers.updateUser);

export default userRoute;
