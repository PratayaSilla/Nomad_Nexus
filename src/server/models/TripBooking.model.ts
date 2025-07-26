import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  tripId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  joinedAt: Date;
  status: "pending" | "confirmed" | "cancelled" | "refunded";
  payment: {
    amount: number;
    currency: string;
    method: "card" | "upi" | "paypal" | "other";
    paidAt?: Date;
    paymentId?: string;
  };
}

const BookingSchema: Schema = new Schema(
  {
    tripId: { 
      type: Schema.Types.ObjectId, 
      ref: "Trip", 
      required: true 
    },
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    joinedAt: { 
      type: Date, 
      default: Date.now 
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "refunded"],
      default: "pending",
    },
    payment: {
      amount: { 
        type: Number, 
        required: true 
      },
      currency: { 
        type: String, 
        default: "INR" 
      },
      method: { 
        type: String, 
        required: true 
      },
      paidAt: { 
        type: Date 
      },
      paymentId: { 
        type: String 
      },
    },
  },
  { 
    timestamps: true 
  }
);

export default mongoose.models.Booking ||
  mongoose.model<IBooking>("Booking", BookingSchema);
