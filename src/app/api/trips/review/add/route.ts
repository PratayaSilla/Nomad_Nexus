import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/server/db/db';
import { TripReview } from '@/server/models/TripReviews.model';
import { Trip } from '@/server/models/Trips.model';
import { ApiSuccess } from '@/server/utils/ApiResponse';
import { ApiError } from '@/server/utils/ApiError';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const {
      tripId,
      reviewerId,
      rating,
      comment,
    } = body;

    if (!tripId || typeof tripId !== 'string') {
      return ApiError(400, 'Trip ID is required');
    }
    if (!reviewerId || typeof reviewerId !== 'string') {
      return ApiError(400, 'Reviewer ID is required');
    }
    if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
      return ApiError(400, 'Rating is required and must be between 1 and 5');
    }
    if (!comment || typeof comment !== 'string') {
      return ApiError(400, 'Comment is required');
    }

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return ApiError(404, 'Trip not found');
    }
    const existingReview = await TripReview.findOne({
      trip: tripId,
      reviewer: reviewerId,
    });

    if (existingReview) {
      return ApiError(400, 'You have already reviewed this trip');
    }
    const review = await TripReview.create({
      trip: tripId,
      reviewer: reviewerId,
      rating,
      comment,
    });

    return ApiSuccess(201, 'Review added successfully', review);

  } 
  catch (error: unknown) {
    let message = 'Failed to add review';
    if (error instanceof Error) {
      message = error.message;
    }
    return ApiError(500, message, error);
  }
} 