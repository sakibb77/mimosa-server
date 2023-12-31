import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import UserController from '../controllers/user.controller';

const userRouter: Router = express.Router();
const userInstance = new UserController();

const authInstance = new AuthMiddleware();

//get an user
userRouter.get('/:uid', authInstance.isAuthenticated, userInstance.getAnUser);

//delete an user
userRouter.delete(
  '/:uid',
  authInstance.isAuthenticated,
  userInstance.deleteAnUser
);

//update an user
userRouter.put(
  '/:uid',
  authInstance.isAuthenticated,
  userInstance.updateAnUser
);

//get all users
userRouter.get(
  '/',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  userInstance.getAllUser
);
export default userRouter;
