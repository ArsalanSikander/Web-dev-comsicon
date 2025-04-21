import mongoose, { Schema, model, models } from 'mongoose';
import { INotification } from '../types/notification';

const notificationSchema = new Schema<INotification>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['Task', 'Message', 'Deadline', 'System'], required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true });

export default models.Notification || model<INotification>('Notification', notificationSchema);