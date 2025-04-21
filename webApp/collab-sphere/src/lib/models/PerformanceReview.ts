import mongoose, { Schema, model, models } from 'mongoose';
import { IPerformanceReview } from '../types/performanceReview';

const performanceReviewSchema = new Schema<IPerformanceReview>({
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  reviewer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reviewee: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  timeliness: { type: Number, min: 1, max: 5 },
  taskQuality: { type: Number, min: 1, max: 5 },
  collaboration: { type: Number, min: 1, max: 5 },
  comments: String,
}, { timestamps: true });

export default models.PerformanceReview || model<IPerformanceReview>('PerformanceReview', performanceReviewSchema);