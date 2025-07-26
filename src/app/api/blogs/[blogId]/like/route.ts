import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/server/db/db';
import { Blog } from '@/server/models/Blogs.model';
import { ApiSuccess } from '@/server/utils/ApiResponse';
import { ApiError } from '@/server/utils/ApiError';

// Toggle like/unlike for a blog
export async function POST(
  req: NextRequest,
  { params }: { params: { blogId: string } }
) {
  try {
    await connectToDatabase();
    const { blogId } = params;
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return ApiError(400, 'User ID is required');
    }

    // Check if blog exists
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return ApiError(404, 'Blog not found');
    }

    // Check if user already liked the blog
    const isLiked = blog.likes.includes(userId);

    if (isLiked) {
      // Unlike the blog
      await Blog.findByIdAndUpdate(
        blogId,
        { $pull: { likes: userId } }
      );
      return ApiSuccess(200, 'Blog unliked successfully');
    } else {
      // Like the blog
      await Blog.findByIdAndUpdate(
        blogId,
        { $addToSet: { likes: userId } }
      );
      return ApiSuccess(200, 'Blog liked successfully');
    }
  } catch (error: unknown) {
    let message = 'Failed to toggle like';
    if (error instanceof Error) {
      message = error.message;
    }
    return ApiError(500, message, error);
  }
}

// GET like status for a user
export async function GET(
  req: NextRequest,
  { params }: { params: { blogId: string } }
) {
  try {
    await connectToDatabase();
    const { blogId } = params;
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return ApiError(400, 'User ID is required');
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return ApiError(404, 'Blog not found');
    }

    const isLiked = blog.likes.includes(userId);
    const likeCount = blog.likes.length;

    return ApiSuccess(200, 'Like status retrieved successfully', {
      isLiked,
      likeCount,
    });
  } catch (error: unknown) {
    let message = 'Failed to get like status';
    if (error instanceof Error) {
      message = error.message;
    }
    return ApiError(500, message, error);
  }
} 