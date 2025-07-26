import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ITripReview extends Document {
  trip: Types.ObjectId;
  reviewer: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}

const tripReviewSchema = new Schema<ITripReview>(
  {
    trip: { 
      type: Schema.Types.ObjectId, 
      ref: 'Trip', 
      required: true 
    },
    reviewer: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    rating: { 
      type: Number, 
      min: 1, 
      max: 5, 
      required: true 
    },
    comment: {
      type: String
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
  },
  { 
    timestamps: true 
  }
);

tripReviewSchema.index({ 
            trip: 1, 
            reviewer: 1 
          }, { unique: true });

export const TripReview =
  mongoose.models.TripReview || mongoose.model<ITripReview>('TripReview', tripReviewSchema);

export { tripReviewSchema };
