import { Request, Response } from 'express';
import beautyPackageModel from '../models/beautyPackage.model';
import { handleError } from '../errors/handle.error';
import mongoose from 'mongoose';

export default class beautyPackageController {
  constructor() {}

  public async getAllBeautyPackages(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      await Promise.resolve().then(async () => {
        const beautyPackages = await beautyPackageModel.find({});

        res.status(200).json(beautyPackages);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async getABeautyPackages(req: Request, res: Response): Promise<void> {
    try {
      const { bid } = req.params;

      if (!mongoose.Types.ObjectId.isValid(bid)) {
        res.status(404).json({ mesage: 'Beauti Package not found' });
      }

      await Promise.resolve().then(async () => {
        const beautyPackage = await beautyPackageModel.findById({ bid });

        res.status(200).json(beautyPackage);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async createABeautyPackages(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { title, description, category, images, price } = req.body;

      await Promise.resolve().then(async () => {
        const beautyPackage = await beautyPackageModel.create({
          title,
          description,
          category,
          images,
          price,
        });

        res.status(200).json(beautyPackage);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async updateABeautyPackages(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { title, description, category, images, price } = req.body;
      const { bid } = req.params;

      if (!mongoose.Types.ObjectId.isValid(bid)) {
        res.status(404).json({ mesage: 'Beauti Package not found' });
      }

      await Promise.resolve().then(async () => {
        const beautyPackage = await beautyPackageModel.findByIdAndUpdate(
          bid,
          {
            title,
            description,
            category,
            images,
            price,
          },
          { new: true }
        );

        res.status(200).json(beautyPackage);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async deleteABeautyPackages(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { bid } = req.params;

      if (!mongoose.Types.ObjectId.isValid(bid)) {
        res.status(404).json({ mesage: 'Beauti Package not found' });
      }

      await Promise.resolve().then(async () => {
        const beautyPackage = await beautyPackageModel.findByIdAndUpdate(bid);

        res.status(200).json(beautyPackage);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}
