import express, { Router } from 'express';
import SpacialistController from '../controllers/spacialist.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

const spacialistRouter: Router = express.Router();
const authInstance = new AuthMiddleware();
const spacialistInstance = new SpacialistController();

//get all spacialist
spacialistRouter.get('/', spacialistInstance.getAllSpacialist);

//get a spacialist
spacialistRouter.get('/sid', spacialistInstance.getASpacialist);

//create a spacialist
spacialistRouter.post(
  '/',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  spacialistInstance.createASpacialist
);

//update a spacialist
spacialistRouter.put(
  '/sid',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  spacialistInstance.updateASpacialist
);

//delete a spacialist
spacialistRouter.delete(
  '/sid',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  spacialistInstance.deleteASpacialist
);

export default spacialistRouter;
