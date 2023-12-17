import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import beautyPackageController from '../controllers/beautyPackage.controller';

const beautyPackageRouter: Router = express.Router();

const authInstance = new AuthMiddleware();
const beautyPackageInstance = new beautyPackageController();

//get all beauty package
beautyPackageRouter.get('/', beautyPackageInstance.getAllBeautyPackages);

//get a beauty package
beautyPackageRouter.get('/:bid', beautyPackageInstance.getABeautyPackages);

//create a beauty package
beautyPackageRouter.post(
  '/',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  beautyPackageInstance.createABeautyPackages
);

//update a beauty package
beautyPackageRouter.put(
  '/:bid',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  beautyPackageInstance.updateABeautyPackages
);

//delete a beauty package
beautyPackageRouter.delete(
  '/:bid',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  beautyPackageInstance.deleteABeautyPackages
);

export default beautyPackageRouter;
