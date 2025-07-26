import mongoose, { Document, Schema } from 'mongoose';

export interface IInterest extends Document {
  name: string;      // e.g., "Hiking", "Photography"
  icon?: string;     // optional icon URL or key
  createdAt: Date;
  updatedAt: Date;
}

const interestSchema = new Schema<IInterest>(
  {
    name: { 
      type: String, 
      required: true, 
      unique: true 
    },
    icon: {
      type: String
    },
  },
  { 
    timestamps: true 
  }
);

export const Interest =
  mongoose.models.Interest || mongoose.model<IInterest>('Interest', interestSchema);
