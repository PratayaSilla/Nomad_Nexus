import mongoose, { Document, Schema, Types } from 'mongoose';


export interface IUserReview extends Document {
    user: Types.ObjectId;
    reviewer: Types.ObjectId;
    rating: number;
    comment: string;
    createdAt: Date;
  }
  
  const userReviewSchema = new Schema<IUserReview>(
    {
      user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
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
    { timestamps: true }
  );
  
  userReviewSchema.index({ 
          user: 1, 
          reviewer: 1 
        }, 
        { 
          unique: true 
        });
  
  export const UserReview =
    mongoose.models.UserReview || mongoose.model<IUserReview>('UserReview', userReviewSchema);
  