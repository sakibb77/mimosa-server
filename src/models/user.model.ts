import mongoose, { Schema, model } from 'mongoose';
import { userType } from '../types/user.type';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { UserMOdelInterface } from '../interfaces/user.interface';

const userSchema = new Schema<userType>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    role: {
      enum: ['user', 'admin'],
      default: 'user',
      type: String,
      required: true,
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookings',
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.statics.register = async function (
  name,
  email,
  password,
  photoUrl,
  address,
  phoneNumber
): Promise<userType> {
  if (!name || !email || !password || !photoUrl) {
    throw new Error('must fill name,email,password and photoUrl');
  }

  const existingUser = await this.findOne({ email });

  if (existingUser) {
    throw new Error('email already exist');
  }

  if (!validator.isEmail(email)) {
    throw new Error('email already exist');
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      'Password must 8+ chars, contains uppercase, number and spacial chars'
    );
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hash,
    photoUrl,
    address,
    phoneNumber,
  });

  return user;
};

userSchema.statics.login = async function (email, password): Promise<userType> {
  if (!email || !password) {
    throw new Error('must fill email and pasword');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error('incorrect email or password');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error('incorrect email or password');
  }

  return user;
};

const userModel = model<userType, UserMOdelInterface>('User', userSchema);

export default userModel;
