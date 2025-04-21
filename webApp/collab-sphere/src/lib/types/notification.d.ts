import { Document, Types } from 'mongoose';

export interface INotification extends Document {
  user: Types.ObjectId;
  type: 'Task' | 'Message' | 'Deadline' | 'System';
  message: string;
  read: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}