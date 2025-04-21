import mongoose, { Schema, model, models } from 'mongoose';
import { IUser } from '../types/user';

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Manager', 'TeamMember'], required: true },
  avatar: { type: String },
}, { timestamps: true });

export default models.User || model<IUser>('User', userSchema);