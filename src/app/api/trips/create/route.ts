import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/server/db/db';
import { Trip } from '@/server/models/Trips.model';
import { ApiSuccess } from '@/server/utils/ApiResponse';
import { ApiError } from '@/server/utils/ApiError';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const {
      title,
      description,
      startDate,
      endDate,
      latitude,
      longitude,
      address,
      host,
      maxCapacity,
      previewImages,
      tags,
      price,
      cancellationPolicy,
      status,
      included,
      notIncluded,
      faqs,
    } = body;
    
     const now = new Date();
     const start = new Date(startDate);
     const end = new Date(endDate);
     if (start < now) {
       return ApiError(400, 'Start date cannot be in the past');
     }
     if (end < now) {
       return ApiError(400, 'End date cannot be in the past');
     }
     if (end <= start) {
       return ApiError(400, 'End date must be after start date');
     }
     if (!Array.isArray(tags) || tags.length < 5) {
      return ApiError(400, 'At least 5 tags are required');
    }

     const locationObj = {
        "type": "Point",
        "coordinates": [parseFloat(latitude),parseFloat(longitude)]
     };
    if (locationObj && (typeof locationObj !== 'object' || !Array.isArray(locationObj.coordinates) || locationObj.coordinates.length !== 2)) {
      return ApiError(400, 'Location must be coordinates [longitude, latitude]');
    }

    const tripData = {
      title,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      location: locationObj,
      address,
      host,
      maxCapacity,
      previewImages,
      tags,
      price,
      cancellationPolicy,
      status,
      included,
      notIncluded,
      ...(faqs && { faqs }),
    };

    const trip = await Trip.create(tripData);

    return ApiSuccess(200, 'Trip created successfully', trip);
  } catch (error: unknown) {
    let message = 'Failed to create trip';
    if (error instanceof Error) {
      message = error.message;
    }
    return ApiError(500, message, error);
  }
}
