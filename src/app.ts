import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import hpp from 'hpp';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';
import beautyPackageRouter from './routes/beautyPackage.route';
import spacialistRouter from './routes/spacialist.route';
import bookingRouter from './routes/booking.route';

class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.configureMiddlewares();
    this.setUpRoutes();
    this.connectToDatabase();
  }

  private configureMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(mongoSanitize());
    this.app.use(helmet());
    this.app.use(hpp());
  }

  private setUpRoutes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.status(200).json({
        message: 'welcome to memosa server',
      });
    });

    //bypass routes
    this.app.use('/api/auth', authRouter);
    this.app.use('/api/users', userRouter);
    this.app.use('/api/beauty_packages', beautyPackageRouter);
    this.app.use('/api/spacialist', spacialistRouter);
    this.app.use('/api/bookings', bookingRouter);
  }

  private connectToDatabase(): void {
    const URI = process.env.MONGO_URI as string;

    mongoose
      .connect(URI)
      .then(() => {
        const PORT = process.env.PORT || 4000;
        this.app.listen(PORT, () => {
          console.log(`server is running on port ${PORT}`);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

dotenv.config();
new App();
