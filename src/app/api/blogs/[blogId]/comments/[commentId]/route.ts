import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/server/db/db';
import { Blog } from '@/server/models/Blogs.model';
import { ApiSuccess } from '@/server/utils/ApiResponse';
import { ApiError } from '@/server/utils/ApiError';

// DELETE a specific comment from a blog
export async function DELETE(
  req: NextRequest,
  { params }: { params: { blogId: string; commentId: string } }
) {
  try {
    await connectToDatabase();
    const { blogId, commentId } = params;
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

    // Find the comment
    const comment = blog.comments.id(commentId);
    if (!comment) {
      return ApiError(404, 'Comment not found');
    }

    // Check if user is the author of the comment or the blog author
    if (comment.user.toString() !== userId && blog.author.toString() !== userId) {
      return ApiError(403, 'You can only delete your own comments or comments on your blog');
    }

    // Remove the comment
    await Blog.findByIdAndUpdate(
      blogId,
      { $pull: { comments: { _id: commentId } } }
    );

    return ApiSuccess(200, 'Comment deleted successfully');
  } catch (error: unknown) {
    let message = 'Failed to delete comment';
    if (error instanceof Error) {
      message = error.message;
    }
    return ApiError(500, message, error);
  }
} 