import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/server/db/db';
import { Blog } from '@/server/models/Blogs.model';
import { ApiSuccess } from '@/server/utils/ApiResponse';
import { ApiError } from '@/server/utils/ApiError';
import { FilterQuery } from 'mongoose';


export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const author = searchParams.get('author');
    const isPublished = searchParams.get('isPublished');
    const tags = searchParams.get('tags');
    const search = searchParams.get('search');

    const filter: FilterQuery<typeof Blog> = {};
    
    if (author) {
      filter.author = author;
    }
    
    if (isPublished !== null) {
      filter.isPublished = isPublished === 'true';
    }
    
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      filter.tags = { $in: tagArray };
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .populate('author', 'name email avatar')
        .populate('likes', 'name')
        .populate('comments.user', 'name avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Blog.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / limit);

    return ApiSuccess(200, 'Blogs retrieved successfully', {
      blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      }
    });
  } catch (error: unknown) {
    let message = 'Failed to retrieve blogs';
    if (error instanceof Error) {
      message = error.message;
    }
    return ApiError(500, message, error);
  }
} 