import { Request, Response } from 'express';
import { handleError } from '../errors/handle.error';
import mongoose from 'mongoose';
import spacialistModel from '../models/spacialist.model';

export default class SpacialistController {
  constructor() {}

  public async getAllSpacialist(req: Request, res: Response): Promise<void> {
    try {
      await Promise.resolve().then(async () => {
        const Spacialist = await spacialistModel.find({});

        res.status(200).json(Spacialist);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async getASpacialist(req: Request, res: Response): Promise<void> {
    try {
      const { sid } = req.params;

      if (!mongoose.Types.ObjectId.isValid(sid)) {
        res.status(404).json({ mesage: 'Spacialist not found' });
      }

      await Promise.resolve().then(async () => {
        const spacialist = await spacialistModel.findById({ sid });

        res.status(200).json(spacialist);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async createASpacialist(req: Request, res: Response): Promise<void> {
    try {
      const { name, designation, bio, photoUrl, dateOfBirth } = req.body;

      await Promise.resolve().then(async () => {
        const spacialist = await spacialistModel.create({
          name,
          designation,
          bio,
          photoUrl,
          dateOfBirth,
        });

        res.status(200).json(spacialist);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async updateASpacialist(req: Request, res: Response): Promise<void> {
    try {
      const { name, designation, bio, photoUrl, dateOfBirth } = req.body;
      const { sid } = req.params;

      if (!mongoose.Types.ObjectId.isValid(sid)) {
        res.status(404).json({ mesage: 'spacialist not found' });
      }

      await Promise.resolve().then(async () => {
        const spacialist = await spacialistModel.findByIdAndUpdate(
          sid,
          {
            name,
            designation,
            bio,
            photoUrl,
            dateOfBirth,
          },
          { new: true }
        );

        res.status(200).json(spacialist);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async deleteASpacialist(req: Request, res: Response): Promise<void> {
    try {
      const { sid } = req.params;

      if (!mongoose.Types.ObjectId.isValid(sid)) {
        res.status(404).json({ mesage: 'Spacialist not found' });
      }

      await Promise.resolve().then(async () => {
        const spacialist = await spacialistModel.findByIdAndUpdate(sid);

        res.status(200).json(spacialist);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}
