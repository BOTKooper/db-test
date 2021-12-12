import { model, Schema } from "mongoose";
import { HydratedDocument } from 'mongoose';

interface IUserAction {
  userId: number;
  actUserId: number;
  actionType: string;
  ceratedAt: Date;
  updatedAt: Date;
}

const ActionSchema = new Schema<IUserAction>({
  userId: {
    type: Number,
    required: true,
    index: true,
  },
  actUserId: {
    type: Number,
    required: true,
    index: true,
  },
  actionType: String,
  createdAt: {
    type: Date,
    default: () => new Date()
  },
  updatedAt: {
    type: Date,
    default: () => new Date()
  },
})

ActionSchema.index( { userId: 1, actUserId: 1 }, { unique: true } );

export const ActionModel = model<IUserAction>('user_action', ActionSchema);
