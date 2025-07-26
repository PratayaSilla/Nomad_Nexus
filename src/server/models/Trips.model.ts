import mongoose, { Document, Schema, Types } from 'mongoose';
import { HydratedDocument } from 'mongoose';


interface ITripReview {
  user: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface ITripFAQ {
  question: string;
  answer: string;
}

export interface ITrip extends Document {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  address: string;
  host: Types.ObjectId;
  joinedUsers: Types.ObjectId[];
  isCompleted: boolean;
  status: 'draft' | 'published';
  maxCapacity?: number;
  previewImages?: string[]; 
  postTripImages?: string[];
  tags?: string[];
  price?: number;
  cancellationPolicy?: string;
  faqs?: ITripFAQ[];
  reviews: ITripReview[];
  included: string[];
  notIncluded: string[];
  comments: {
    user: Types.ObjectId;
    message: string;
    createdAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const tripSchema = new Schema<ITrip>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
        required: true,
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
        required: true,
      },
      
    },
    address: {
      type: String,
      required: true,
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    joinedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    isCompleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
      required: true,
    },
    maxCapacity: {
      type: Number,
      required: true,
    },
    previewImages: [
      {
        type: String,
        required: true,
      },
    ],
    included : [
      {
        type: String
      }
    ],
    notIncluded : [
      {
        type: String
      }
    ],
    postTripImages: [
      {
        type: String,
      },
    ],
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    cancellationPolicy: {
      type: String,
    },
    faqs: [
      {
        _id: false,
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
    reviews: [
      {
        type: String,
      },
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        message: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

tripSchema.index({ location: '2dsphere' });

tripSchema.pre<ITrip>('save', function (next) {
  const trip = this as HydratedDocument<ITrip>;

  if (trip.isModified('status') && trip.get('status', null, { getters: false }) === 'published' && trip.status === 'draft') {
    return next(new Error('Cannot revert a published trip back to draft'));
  }

  if (trip.endDate && new Date() > trip.endDate) {
    trip.isCompleted = true;
  }

  next();
});


export type TripDocument = HydratedDocument<ITrip>;

export const Trip =
  mongoose.models.Trip || mongoose.model<ITrip>('Trip', tripSchema);

