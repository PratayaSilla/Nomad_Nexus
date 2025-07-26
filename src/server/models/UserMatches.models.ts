import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IMatch extends Document {
  user1: Types.ObjectId;
  user2: Types.ObjectId;
  status: 'accepted' | 'rejected';
  createdAt: Date;
}

const matchSchema = new Schema<IMatch>(
  {
    user1: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    user2: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['accepted', 'rejected'], 
      required: true 
    },
  },
  { 
    timestamps: true 
  }
);

matchSchema.index({ user1: 1, user2: 1 }, { unique: true });

export const Match =
  mongoose.models.Match || mongoose.model<IMatch>('Match', matchSchema);
