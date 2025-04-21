import { Document, Types } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description?: string;
  assignedTo: Types.ObjectId[];
  status: 'To Do' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  project: Types.ObjectId;
  deadline?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}