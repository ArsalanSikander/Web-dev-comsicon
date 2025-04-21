import mongoose, { Schema, model, models } from 'mongoose';
import { ITask } from '../types/task';

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  assignedTo: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['To Do', 'In Progress', 'Completed'], default: 'To Do' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  deadline: Date,
}, { timestamps: true });

export default models.Task || model<ITask>('Task', taskSchema);