import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/server/db/db';
import { Blog } from '@/server/models/Blogs.model';
import { ApiSuccess } from '@/server/utils/ApiResponse';
import { ApiError } from '@/server/utils/ApiError';
import { UpdateQuery } from 'mongoose';


export async function GET(
  req: NextRequest,
  { params }: { params: { blogId: string } }
) {
  try {
    await connectToDatabase();

    const { blogId } = await params;

    const blog = await Blog.findById(blogId)
      .populate('author', 'name email avatar')
      .populate('likes', 'name avatar')
      .populate('comments.user', 'name avatar')
      .lean();

    if (!blog) {
      return ApiError(404, 'Blog not found');
    }

    return ApiSuccess(200, 'Blog retrieved successfully', blog);
  } 
  catch (error: unknown) {
    let message = 'Failed to retrieve blog';
    if (error instanceof Error) {
      message = error.message;
    }
    return ApiError(500, message, error);
  }
}


export async function DELETE(
  req: NextRequest,
  { params }: { params: { blogId: string } }
) {
  try {
    await connectToDatabase();
    const { blogId } = params;

    const blog = await Blog.findByIdAndDelete(blogId);
    
    if (!blog) {
      return ApiError(404, 'Blog not found');
    }

    return ApiSuccess(200, 'Blog deleted successfully');
  } catch (error: unknown) {
    let message = 'Failed to delete blog';
    if (error instanceof Error) {
      message = error.message;
    }
    return ApiError(500, message, error);
  }
} 



export async function PUT(
  req: NextRequest,
  { params }: { params: { blogId: string } }
) {
  try {
    await connectToDatabase();
    const { blogId } = params;
    const body = await req.json();

    const {
      title,
      content,
      coverImage,
      tags,
      isPublished,
    } = body;

    const existingBlog = await Blog.findById(blogId);
    if (!existingBlog) {
      return ApiError(404, 'Blog not found');
    }

    if (title !== undefined) {
      if (!title || title.trim().length === 0) {
        return ApiError(400, 'Title cannot be empty');
      }
      if (title.length > 200) {
        return ApiError(400, 'Title must be less than 200 characters');
      }
    }

    if (content !== undefined) {
      if (!content || content.trim().length === 0) {
        return ApiError(400, 'Content cannot be empty');
      }
      if (content.length < 100) {
        return ApiError(400, 'Content must be at least 100 characters');
      }
    }

    if (tags !== undefined && (!Array.isArray(tags) || tags.length > 10)) {
      return ApiError(400, 'Tags must be an array with maximum 10 items');
    }

    const updateData: UpdateQuery<typeof Blog> = {};
    if (title !== undefined) updateData.title = title.trim();
    if (content !== undefined) updateData.content = content.trim();
    if (coverImage !== undefined) updateData.coverImage = coverImage;
    if (tags !== undefined) updateData.tags = tags;
    if (isPublished !== undefined) updateData.isPublished = isPublished;

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      updateData,
      { new: true, runValidators: true }
    )

    return ApiSuccess(200, 'Blog updated successfully', updatedBlog);
  } catch (error: unknown) {
    let message = 'Failed to update blog';
    if (error instanceof Error) {
      message = error.message;
    }
    return ApiError(500, message, error);
  }
}

