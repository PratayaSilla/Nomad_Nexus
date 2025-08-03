import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/server/db/db';
import { Blog } from '@/server/models/Blogs.model';
import { ApiSuccess } from '@/server/utils/ApiResponse';
import { ApiError } from '@/server/utils/ApiError';
import { Types } from 'mongoose';

interface Comment {
  _id: Types.ObjectId;
  user: {
    _id: Types.ObjectId;
    name: string;
    avatar: string;
  };
  message: string;
  createdAt: Date;
}

// GET comments for a blog
export async function GET(
  req: NextRequest,
  { params }: { params: { blogId: string } }
) {
  try {
    await connectToDatabase();
    const { blogId } = params;
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const blog = await Blog.findById(blogId)
      .populate('comments.user', 'name avatar')
      .select('comments')
      .lean<{ comments: Comment[] }>();

    if (!blog) {
      return ApiError(404, 'Blog not found');
    }

    const skip = (page - 1) * limit;
    const comments = blog.comments
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(skip, skip + limit);

    const total = blog.comments.length;
    const totalPages = Math.ceil(total / limit);

    return ApiSuccess(200, 'Comments retrieved successfully', {
      comments,
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
    const message = error instanceof Error ? error.message : 'Failed to retrieve comments';
    return ApiError(500, message, error);
  }
}

// ADD comment to a blog
export async function POST(
  req: NextRequest,
  { params }: { params: { blogId: string } }
) {
  try {
    await connectToDatabase();
    const { blogId } = params;
    const body = await req.json();
    const { userId, message }: { userId?: string; message?: string } = body;

    if (!userId) return ApiError(400, 'User ID is required');
    if (!message || message.trim().length === 0) return ApiError(400, 'Comment message is required');
    if (message.length > 1000) return ApiError(400, 'Comment must be less than 1000 characters');

    const blog = await Blog.findById(blogId);
    if (!blog) return ApiError(404, 'Blog not found');

    const newComment = {
      user: userId,
      message: message.trim(),
      createdAt: new Date(),
    };

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { $push: { comments: newComment } },
      { new: true }
    ).populate('comments.user', 'name avatar');

    const addedComment = updatedBlog?.comments.at(-1);

    return ApiSuccess(201, 'Comment added successfully', addedComment);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to add comment';
    return ApiError(500, message, error);
  }
}
