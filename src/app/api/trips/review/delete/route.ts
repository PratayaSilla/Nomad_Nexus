import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/server/db/db';
import { TripReview } from '@/server/models/TripReviews.model';
import { ApiSuccess } from '@/server/utils/ApiResponse';
import { ApiError } from '@/server/utils/ApiError';

export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { reviewId } = body;

    if (!reviewId || typeof reviewId !== 'string') {
      return ApiError(400, 'Review ID is required');
    }

    const existingReview = await TripReview.findById(reviewId);
    if (!existingReview) {
      return ApiError(404, 'Review not found');
    }

    await TripReview.findByIdAndDelete(reviewId);

    return ApiSuccess(200, 'Review deleted successfully');
    
  } 
  catch (error: unknown) {
    let message = 'Failed to delete review';
    if (error instanceof Error) {
      message = error.message;
    }
    return ApiError(500, message, error);
  }
} 