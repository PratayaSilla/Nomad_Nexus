import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ITripItinerary extends Document {
  trip: Types.ObjectId;
  day: number;
  entries: {
    time: string;         // e.g., "10:00 AM"
    title: string;        // e.g., "Breakfast at camp"
    description?: string; // Optional detail
    location?: string;    // e.g., "Base Camp"
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const itineraryEntrySchema = new Schema(
  {
    time: { 
      type: String, 
      required: true 
    },
    title: { 
      type: String, 
      required: true 
    },
    description: {
      type: String
    },
    location: {
      type: String
    },
  },
  { 
    _id: false 
  }
);

const tripItinerarySchema = new Schema<ITripItinerary>(
  {
    trip: { 
      type: Schema.Types.ObjectId, 
      ref: 'Trip', 
      required: true 
    },
    day: { 
      type: Number, 
      required: true 
    },
    entries: { 
      type: [itineraryEntrySchema], 
      default: [] 
    },
  },
  { 
    timestamps: true 
  }
);

tripItinerarySchema.index({ trip: 1, day: 1 }, { unique: true });

export const TripItinerary =
  mongoose.models.TripItinerary ||
  mongoose.model<ITripItinerary>('TripItinerary', tripItinerarySchema);
