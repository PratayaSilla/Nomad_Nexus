import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/server/db/db';
import { Trip } from '@/server/models/Trips.model';
import { ApiSuccess } from '@/server/utils/ApiResponse';
import { ApiError } from '@/server/utils/ApiError';

export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const {
      _id,
      title,
      description,
      startDate,
      endDate,
      location,
      address,
      host,
      isCompleted,
      maxCapacity,
      previewImages,
      postTripImages,
      tags,
      price,
      cancellationPolicy,
      status,
      reviews,
      comments,
    } = body;

    if (!_id || typeof _id !== 'string') {
      return ApiError(400, 'Trip ID is required');
    }

    const existingTrip = await Trip.findById(_id);
    if (!existingTrip) {
      return ApiError(404, 'Trip not found');
    }

    if (startDate || endDate) {
      const now = new Date();
      if (startDate) {
        const start = new Date(startDate);
        if (start < now) {
          return ApiError(400, 'Start date cannot be in the past');
        }
      }
      if (endDate) {
        const end = new Date(endDate);
        if (end < now) {
          return ApiError(400, 'End date cannot be in the past');
        }
      }
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (end <= start) {
          return ApiError(400, 'End date must be after start date');
        }
      }
    }

    if (tags && (!Array.isArray(tags) || tags.length < 5)) {
      return ApiError(400, 'At least 5 tags are required');
    }

    if (previewImages && (!Array.isArray(previewImages) || previewImages.length < 2)) {
      return ApiError(400, 'At least 2 preview images are required');
    }

    if (location && (typeof location !== 'object' || !Array.isArray(location.coordinates) || location.coordinates.length !== 2)) {
      return ApiError(400, 'Location must be coordinates [longitude, latitude]');
    }

    if (postTripImages && postTripImages.length > 0) {
      const isMarkingCompleted = status === 'completed' || isCompleted === true;
      const isAlreadyCompleted = existingTrip.status === 'completed' || existingTrip.isCompleted === true;
      
      if (!isMarkingCompleted && !isAlreadyCompleted) {
        return ApiError(400, 'Post trip images can only be added when trip is completed');
      }
    }

    const updateData: Record<string, unknown> = {};
    
    if (title && title !== existingTrip.title) updateData.title = title;
    if (description !== undefined && description !== existingTrip.description) updateData.description = description;
    if (startDate && new Date(startDate).getTime() !== existingTrip.startDate.getTime()) updateData.startDate = new Date(startDate);
    if (endDate && new Date(endDate).getTime() !== existingTrip.endDate.getTime()) updateData.endDate = new Date(endDate);
    if (location && JSON.stringify(location) !== JSON.stringify(existingTrip.location)) updateData.location = location;
    if (address !== undefined && address !== existingTrip.address) updateData.address = address;
    if (host && host !== existingTrip.host.toString()) updateData.host = host;
    if (isCompleted !== undefined && isCompleted !== existingTrip.isCompleted) updateData.isCompleted = isCompleted;
    if (maxCapacity !== undefined && maxCapacity !== existingTrip.maxCapacity) updateData.maxCapacity = maxCapacity;
    if (previewImages && JSON.stringify(previewImages) !== JSON.stringify(existingTrip.previewImages)) updateData.previewImages = previewImages;
    if (postTripImages !== undefined && JSON.stringify(postTripImages) !== JSON.stringify(existingTrip.postTripImages)) updateData.postTripImages = postTripImages;
    if (tags && JSON.stringify(tags) !== JSON.stringify(existingTrip.tags)) updateData.tags = tags;
    if (price !== undefined && price !== existingTrip.price) updateData.price = price;
    if (cancellationPolicy !== undefined && cancellationPolicy !== existingTrip.cancellationPolicy) updateData.cancellationPolicy = cancellationPolicy;
    if (status && status !== existingTrip.status) updateData.status = status;
    if (reviews !== undefined && JSON.stringify(reviews) !== JSON.stringify(existingTrip.reviews)) updateData.reviews = reviews;
    if (comments !== undefined && JSON.stringify(comments) !== JSON.stringify(existingTrip.comments)) updateData.comments = comments;

    const updatedTrip = await Trip.findByIdAndUpdate(
      _id,
      updateData,
      { new: true, runValidators: true }
    );

    return ApiSuccess(200, 'Trip updated successfully', updatedTrip);

  } 
  catch (error: unknown) {
    let message = 'Failed to update trip';
    if (error instanceof Error) {
      message = error.message;
    }
    return ApiError(500, message, error);
  }
} 