import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/server/db/db';
import { Trip } from '@/server/models/Trips.model';
import { ApiSuccess } from '@/server/utils/ApiResponse';
import { ApiError } from '@/server/utils/ApiError';

export async function GET(req: NextRequest, { params }: { params: { tripId: string } }) {
  try {
    await connectToDatabase();
    const { tripId } = params;

    if (!tripId || typeof tripId !== 'string') {
      return ApiError(400, 'Trip ID is required');
    }

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return ApiError(404, 'Trip not found');
    }

    return ApiSuccess(200, 'Trip fetched successfully', trip);
  } catch (error: unknown) {
    let message = 'Failed to fetch trip';
    if (error instanceof Error) {
      message = error.message;
    }
    return ApiError(500, message, error);
  }
}
