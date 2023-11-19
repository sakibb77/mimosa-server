import express, { Router } from 'express';

const spacialistRouter: Router = express.Router();

//get all spacialist
spacialistRouter.get('/');

//get a spacialist
spacialistRouter.get('/sid');

//create a spacialist
spacialistRouter.post('/');

//update a spacialist
spacialistRouter.put('/sid');

//delete a spacialist
spacialistRouter.delete('/sid');

export default spacialistRouter;
