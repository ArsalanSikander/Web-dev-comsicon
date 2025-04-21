import mongoose, { Schema, model, models } from 'mongoose';
import { IProject } from '../types/project';

const projectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  description: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  teamMembers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  startDate: Date,
  endDate: Date,
  status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
}, { timestamps: true });

export default models.Project || model<IProject>('Project', projectSchema);