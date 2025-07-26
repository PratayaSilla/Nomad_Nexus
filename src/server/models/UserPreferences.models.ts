import mongoose, { Document, Schema, Types } from 'mongoose';


export interface IPreference extends Document {
    user: Types.ObjectId;
    preferredAgeRange?: [number, number];
    maxDistanceKm?: number;
    interests?: string[];
    gender?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  const preferenceSchema = new Schema<IPreference>(
    {
      user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, 
        unique: true 
      },
      preferredAgeRange: {
        type: [Number]
      },
      maxDistanceKm: {
        type: Number
      },
      interests: {
        type: [String]
      },
      gender: {
        type: String
      },
    },
    { timestamps: true }
  );
  
  export const Preference =
    mongoose.models.Preference || mongoose.model<IPreference>('Preference', preferenceSchema);
  