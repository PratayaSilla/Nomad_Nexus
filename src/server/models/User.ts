import mongoose, { Document, Schema, Types } from 'mongoose';
import bcrypt from 'bcrypt';

interface IReview {
  reviewer: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface IUserBase {
  email: string;
  password?: string;
  fullName?: string;
  username?: string;
  avatar?: string;
  adhaar?: {
    id: string;
    images: string[];
  };
  isVerified?: boolean;
  provider?: {
    type: string;
    id?: string;
    name?: string;
  };
  birthDate?: Date;
  bio?: string;
  location?: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  address?: string;
  hostedTrips: Types.ObjectId[];
  joinedTrips: Types.ObjectId[];
  reviews: IReview[];
  socialMedias?: { platform: string; url: string }[]; // Added field
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends IUserBase, Document {
  _id: Types.ObjectId;
  isPasswordCorrect(candidatePassword: string): Promise<boolean>;
}

const reviewSchema = new Schema<IReview>(
  {
    reviewer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function (this: IUser) {
        return !this.provider || this.provider.type === 'credentials';
      },
    },
    fullName: {
      type: String
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
    },
    avatar: {
      type: String
    },
    adhaar: {
      id: String,
      images: [String],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: {
        type: String,
        enum: ['credentials', 'google', 'facebook'],
        default: 'credentials',
      },
      id: {
        type: String
      },
      name: {
        type: String
      },
    },
    birthDate: {
      type: String
    },
    bio: {
      type: String
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
    address: {
      type: String
    },
    hostedTrips: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Trip',
      }
    ],
    joinedTrips: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Trip',
      }
    ],
    reviews: [reviewSchema],
    socialMedias: [
      {
        platform: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.index({ location: '2dsphere' });

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const saltRounds = 12;
    this.password = await bcrypt.hash(this.password!, saltRounds);
    next();
  } catch (err) {
    next(err as Error);
  }
});

userSchema.methods.isPasswordCorrect = async function (
  this: IUser,
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export const User =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);
