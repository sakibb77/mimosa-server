import { Model } from 'mongoose';
import { userType } from '../types/user.type';

export interface UserMOdelInterface extends Model<userType> {
  register(
    name: string,
    email: string,
    password: string,
    photoUrl: string,
    address: string,
    phoneNumber?: string
  ): Promise<userType>;

  login(email: string, password: string): Promise<userType>;
}
