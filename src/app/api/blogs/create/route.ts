import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/server/db/db';
import { Blog } from '@/server/models/Blogs.model';
import { ApiSuccess } from '@/server/utils/ApiResponse';
import { ApiError } from '@/server/utils/ApiError';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { author, title, content, coverImage, tags, isPublished } = body;

    // Convert isPublished from string to boolean if necessary
    let isPublishedBool: boolean;
    if (typeof isPublished === 'string') {
      isPublishedBool = isPublished.toLowerCase() === 'true';
    } else {
      isPublishedBool = Boolean(isPublished);
    }

    if (
      !author ||
      !title || typeof title !== 'string' || title.trim().length === 0 ||
      !content || typeof content !== 'string' || content.trim().length === 0 ||
      !coverImage || typeof coverImage !== 'string' || coverImage.trim().length === 0 ||
      !tags || !Array.isArray(tags) || tags.length === 0 ||
      typeof isPublishedBool !== 'boolean'
    ) {
      return ApiError(400, 'All fields are required.');
    }
    if (title.length > 100) {
      return ApiError(400, 'Title must be less than 60 characters');
    }
    if (content.length < 100) {
      return ApiError(400, 'Content must be at least 100 characters');
    }
    if (tags.length < 3) {
      return ApiError(400, 'At leaast 3 tags are required !');
    }

    const blog = await Blog.create({
      author,
      title: title.trim(),
      content: content.trim(),
      coverImage,
      tags,
      isPublished: isPublishedBool,
    });

    return ApiSuccess(201, 'Blog created successfully', blog);

  } 
  catch (error: unknown) {
    let message = 'Failed to create blog';
    if (error instanceof Error) {
      message = error.message;
    }
    return ApiError(500, message, error);
  }
}
