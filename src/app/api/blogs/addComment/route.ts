import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/server/db/db';
import { Blog } from '@/server/models/Blogs.model';
import { ApiError } from '@/server/utils/ApiError';
import { ApiSuccess } from '@/server/utils/ApiResponse';


export async function POST (req : NextRequest) {
    try {
        await connectToDatabase()
        const body = await req.json()

        const { comment,user ,blogId } = body

        if (!blogId) {
            return ApiError(400,'Story Id not recieved !')
        }

        if (!user ) {
            return ApiError(400,'Please login to be able to add comment !')
        }

        if (!comment || comment.trim().length === 0) {
            return ApiError(400, 'Comment message is required');
          }
        if (comment.length > 1000) {
        return ApiError(400, 'Comment must be less than 1000 characters');
        }

        const blog = await Blog.updateOne(
            { _id: blogId },
            {
              $push: {
                comments: {
                  user: user ,
                  comment : comment ,
                }
              }
            }
          )
        
        if (!blog) {
            return ApiError(400,'Error adding your comment')
        }

        return ApiSuccess(200,'Comment added successfully!')
          

    } catch (error: unknown) {
        let message = 'Failed to update blog';
        if (error instanceof Error) {
          message = error.message;
        }
        return ApiError(500, message, error);
      }
}   