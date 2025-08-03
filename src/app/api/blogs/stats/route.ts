import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/server/db/db';
import { Blog } from '@/server/models/Blogs.model';
import { ApiSuccess } from '@/server/utils/ApiResponse';
import { ApiError } from '@/server/utils/ApiError';
import { Types } from 'mongoose';

interface BlogDoc {
  title: string;
  likes?: Types.ObjectId[];
  comments?: Types.ObjectId[];
  author?: { name?: string };
  createdAt?: Date;
}

// GET blog statistics
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const author = searchParams.get('author');

    const filter: Record<string, unknown> = {};
    if (author) filter.author = author;

    const [
      totalBlogs,
      publishedBlogs,
      totalLikes,
      totalComments,
      mostLikedBlog,
      mostCommentedBlog,
      recentBlogs,
      popularTags,
      monthlyStats
    ] = await Promise.all([
      Blog.countDocuments(filter),
      Blog.countDocuments({ ...filter, isPublished: true }),

      Blog.aggregate([
        { $match: filter },
        { $project: { likesCount: { $size: '$likes' } } },
        { $group: { _id: null, total: { $sum: '$likesCount' } } }
      ]),

      Blog.aggregate([
        { $match: filter },
        { $project: { commentsCount: { $size: '$comments' } } },
        { $group: { _id: null, total: { $sum: '$commentsCount' } } }
      ]),

      Blog.findOne(filter)
        .sort({ 'likes.length': -1 })
        .populate('author', 'name')
        .select('title likes author')
        .lean<BlogDoc>(),

      Blog.findOne(filter)
        .sort({ 'comments.length': -1 })
        .populate('author', 'name')
        .select('title comments author')
        .lean<BlogDoc>(),

      Blog.find({
        ...filter,
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      })
        .populate('author', 'name')
        .select('title createdAt author')
        .sort({ createdAt: -1 })
        .limit(5)
        .lean<BlogDoc[]>(),

      Blog.aggregate([
        { $match: filter },
        { $unwind: '$tags' },
        { $group: { _id: '$tags', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
        { $project: { tag: '$_id', count: 1, _id: 0 } }
      ]),

      Blog.aggregate([
        { $match: filter },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' }
            },
            count: { $sum: 1 },
            likes: { $sum: { $size: '$likes' } },
            comments: { $sum: { $size: '$comments' } }
          }
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 6 }
      ])
    ]);

    const stats = {
      overview: {
        totalBlogs,
        publishedBlogs,
        draftBlogs: totalBlogs - publishedBlogs,
        totalLikes: totalLikes[0]?.total || 0,
        totalComments: totalComments[0]?.total || 0,
        averageLikesPerBlog: totalBlogs > 0 ? Math.round((totalLikes[0]?.total || 0) / totalBlogs * 100) / 100 : 0,
        averageCommentsPerBlog: totalBlogs > 0 ? Math.round((totalComments[0]?.total || 0) / totalBlogs * 100) / 100 : 0,
      },
      topContent: {
        mostLikedBlog: mostLikedBlog ? {
          title: mostLikedBlog.title,
          likes: mostLikedBlog.likes?.length || 0,
          author: mostLikedBlog.author?.name || 'Unknown'
        } : null,
        mostCommentedBlog: mostCommentedBlog ? {
          title: mostCommentedBlog.title,
          comments: mostCommentedBlog.comments?.length || 0,
          author: mostCommentedBlog.author?.name || 'Unknown'
        } : null,
      },
      recentActivity: {
        recentBlogs: recentBlogs.map((blog) => ({
          title: blog.title,
          createdAt: blog.createdAt,
          author: blog.author?.name || 'Unknown'
        }))
      },
      trends: {
        popularTags,
        monthlyStats: monthlyStats.map((stat: {
          _id: { year: number; month: number };
          count: number;
          likes: number;
          comments: number;
        }) => ({
          month: `${stat._id.year}-${String(stat._id.month).padStart(2, '0')}`,
          blogs: stat.count,
          likes: stat.likes,
          comments: stat.comments
        }))
      }
    };

    return ApiSuccess(200, 'Blog statistics retrieved successfully', stats);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to retrieve blog statistics';
    return ApiError(500, message, error);
  }
}
