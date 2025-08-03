import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IBlog extends Document {
  author: Types.ObjectId;
  title: string;
  content: string;
  coverImage?: string;
  tags?: string[];
  isPublished: boolean;
  likes: Types.ObjectId[];
  comments: {
    user: Types.ObjectId;
    message: string;
    createdAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    author: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    title: { 
      type: String, 
      required: true 
    },
    content: { 
      type: String, 
      required: true 
    },
    coverImage: { 
      type: String, 
    },
    tags: [
        { 
          type: String, 
        }
    ],
    isPublished: { 
      type: Boolean, 
      default: false 
    },
    likes: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    }],
    comments: [
      {
        user: { 
          type: Schema.Types.ObjectId, 
          ref: 'User' 
        },
        comment: {
          type: String
        },
        createdAt: { 
          type: Date, 
          default: Date.now
        },
      },
    ],
  },
  { 
    timestamps: true 
  }
);

export const Blog =
  mongoose.models.Blog || mongoose.model<IBlog>('Blog', blogSchema);
