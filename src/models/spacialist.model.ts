import mongoose, { Schema, model } from 'mongoose';
import { specialistType } from '../types/specialist.type';

const spacialistSchema = new Schema<specialistType>(
  {
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },

    photoUrl: {
      type: String,
      required: true,
    },

    dateOfBirth: {
      type: String,
      required: true,
    },

    beautyPackages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BeautyPackage',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const spacialistModel = model<specialistType>('User', spacialistSchema);

export default spacialistModel;
