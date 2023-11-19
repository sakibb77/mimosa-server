import express, { Router } from 'express';

const bookingRouter: Router = express.Router();

//get all booking
bookingRouter.get('/');

//create a booking
bookingRouter.post('/create');

//get all bookings for an user
bookingRouter.get('/read');

//delete a booking
bookingRouter.delete('/bid');

export default bookingRouter;
