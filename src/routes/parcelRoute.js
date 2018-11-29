import express from 'express';
import Auth from '../middleware/Auth';
import ParcelController from '../controller/ParcelController';
import Helper from '../controller/HelperController';

const parcelRoute = express.Router();

parcelRoute.route('/')
  .get(Auth.verifyToken, ParcelController.getAll)
  .post(Helper.parcelValidor, Auth.verifyToken, ParcelController.create);
// create Helper method for these routes
parcelRoute.route('/:parcelId')
  .get(Auth.verifyToken, ParcelController.getOne);

parcelRoute.route('/:parcelId/cancel')
  .put(Auth.verifyToken, ParcelController.cancel);

parcelRoute.route('/:parcelId/presentLocation')
  .put(Auth.verifyToken, ParcelController.ChangePresentLocation);

parcelRoute.route('/:parcelId/destination')
  .put(Auth.verifyToken, ParcelController.changeDestination);

parcelRoute.route('/:parcelId/status')
  .put(Auth.verifyToken, ParcelController.changeStatus);

export default parcelRoute;
