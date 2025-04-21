import { Document, Types } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description?: string;
  createdBy: Types.ObjectId;
  teamMembers: Types.ObjectId[];
  tasks: Types.ObjectId[];
  startDate?: Date;
  endDate?: Date;
  status: 'Not Started' | 'In Progress' | 'Completed';
  createdAt?: Date;
  updatedAt?: Date;
}