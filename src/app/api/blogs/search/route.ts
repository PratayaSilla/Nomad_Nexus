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

    const query = searchParams.get('q') || '';
    const author = searchParams.get('author');
    const tags = searchParams.get('tags');
    const isPublished = searchParams.get('isPublished');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const minLikes = parseInt(searchParams.get('minLikes') || '0');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');

    const filter: FilterQuery<typeof Blog> = {};

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } },
      ];
    }

    if (author) {
      filter.author = author;
    }

    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      filter.tags = { $in: tagArray };
    }

    if (isPublished !== null) {
      filter.isPublished = isPublished === 'true';
    }

    if (minLikes > 0) {
      filter.$expr = { $gte: [{ $size: '$likes' }, minLikes] };
    }

    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) {
        filter.createdAt.$gte = new Date(dateFrom);
      }
      if (dateTo) {
        filter.createdAt.$lte = new Date(dateTo);
      }
    }

    const sort = {} as { [key: string]: number | { $size: string } };
    if (sortBy === 'likes') {
      sort.$expr = { $size: '$likes' };
    } else if (sortBy === 'comments') {
      sort.$expr = { $size: '$comments' };
    } else {
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .populate('author', 'name email avatar')
        .populate('likes', 'name')
        .populate('comments.user', 'name avatar')
        .sort(sort as { [key: string]: 1 | -1 | { $meta: string } })
        .skip(skip)
        .limit(limit)
        .lean(),
      Blog.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / limit);

    const popularTags = await Blog.aggregate([
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { tag: '$_id', count: 1, _id: 0 } }
    ]);

    return ApiSuccess(200, 'Search completed successfully', {
      blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
      searchInfo: {
        query,
        filters: {
          author,
          tags,
          isPublished,
          minLikes,
          dateFrom,
          dateTo,
        },
        sortBy,
        sortOrder,
      },
      suggestions: {
        popularTags,
      }
    });
  } catch (error: unknown) {
    let message = 'Failed to search blogs';
    if (error instanceof Error) {
      message = error.message;
    }
    return ApiError(500, message, error);
  }
} 