import express from 'express';
import Auth from '../middleware/Authentication';
import ParcelController from '../controller/ParcelController';
import Helper from '../controller/HelperController';

const parcelRoute = express.Router();

parcelRoute.route('/')
  .get(Auth.secureRoute, ParcelController.getAll)
  .post(Helper.parcelValidor, ParcelController.create);
// create Helper method for these routes
parcelRoute.route('/:parcelId')
  .get(Auth.secureRoute, ParcelController.getOne);

parcelRoute.route('/:parcelId/cancel')
  .put(ParcelController.cancel);

parcelRoute.route('/:parcelId/destination')
  .put(ParcelController.changeDestination);

parcelRoute.route('/:parcelId/presentLocation')
  .put(Helper.validatePresentLocation, Auth.secureRoute,
    ParcelController.ChangePresentLocation);

parcelRoute.route('/:parcelId/status')
  .put(Helper.validateStatus, Auth.secureRoute,
    ParcelController.changeStatus);

export default parcelRoute;
