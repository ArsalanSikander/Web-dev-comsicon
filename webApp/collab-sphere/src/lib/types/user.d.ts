import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'Manager' | 'TeamMember';
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}