import { Document, Types } from 'mongoose';

export interface IMessage extends Document {
  sender: Types.ObjectId;
  content: string;
  project?: Types.ObjectId;
  to?: Types.ObjectId;
  fileUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}