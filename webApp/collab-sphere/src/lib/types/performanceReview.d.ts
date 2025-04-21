import { Document, Types } from 'mongoose';

export interface IPerformanceReview extends Document {
  project: Types.ObjectId;
  reviewer: Types.ObjectId;
  reviewee: Types.ObjectId;
  timeliness: number;
  taskQuality: number;
  collaboration: number;
  comments?: string;
  createdAt?: Date;
  updatedAt?: Date;
}