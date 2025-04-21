import mongoose, { Schema, model, models } from 'mongoose';
import { IMessage } from '../types/message';

const messageSchema = new Schema<IMessage>({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  project: { type: Schema.Types.ObjectId, ref: 'Project' }, // null for DMs
  to: { type: Schema.Types.ObjectId, ref: 'User' },
  fileUrl: String,
}, { timestamps: true });

export default models.Message || model<IMessage>('Message', messageSchema);