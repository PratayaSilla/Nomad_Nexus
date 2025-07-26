import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/server/db/db';
import { Blog } from '@/server/models/Blogs.model';
import { ApiSuccess } from '@/server/utils/ApiResponse';
import { ApiError } from '@/server/utils/ApiError';

// GET blog statistics
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const author = searchParams.get('author');

    const filter: any = {};
    if (author) {
      filter.author = author;
    }

    // Get basic stats
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
      // Total blogs
      Blog.countDocuments(filter),
      
      // Published blogs
      Blog.countDocuments({ ...filter, isPublished: true }),
      
      // Total likes across all blogs
      Blog.aggregate([
        { $match: filter },
        { $project: { likesCount: { $size: '$likes' } } },
        { $group: { _id: null, total: { $sum: '$likesCount' } } }
      ]),
      
      // Total comments across all blogs
      Blog.aggregate([
        { $match: filter },
        { $project: { commentsCount: { $size: '$comments' } } },
        { $group: { _id: null, total: { $sum: '$commentsCount' } } }
      ]),
      
      // Most liked blog
      Blog.findOne(filter)
        .sort({ $expr: { $size: '$likes' } })
        .populate('author', 'name')
        .select('title likes author')
        .lean(),
      
      // Most commented blog
      Blog.findOne(filter)
        .sort({ $expr: { $size: '$comments' } })
        .populate('author', 'name')
        .select('title comments author')
        .lean(),
      
      // Recent blogs (last 7 days)
      Blog.find({
        ...filter,
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      })
        .populate('author', 'name')
        .select('title createdAt author')
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
      
      // Popular tags
      Blog.aggregate([
        { $match: filter },
        { $unwind: '$tags' },
        { $group: { _id: '$tags', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
        { $project: { tag: '$_id', count: 1, _id: 0 } }
      ]),
      
      // Monthly stats for the last 6 months
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
        recentBlogs: recentBlogs.map((blog: any) => ({
          title: blog.title,
          createdAt: blog.createdAt,
          author: blog.author?.name || 'Unknown'
        }))
      },
      trends: {
        popularTags,
        monthlyStats: monthlyStats.map((stat: any) => ({
          month: `${stat._id.year}-${String(stat._id.month).padStart(2, '0')}`,
          blogs: stat.count,
          likes: stat.likes,
          comments: stat.comments
        }))
      }
    };

    return ApiSuccess(200, 'Blog statistics retrieved successfully', stats);
  } catch (error: unknown) {
    let message = 'Failed to retrieve blog statistics';
    if (error instanceof Error) {
      message = error.message;
    }
    return ApiError(500, message, error);
  }
} 