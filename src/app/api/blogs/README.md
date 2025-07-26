# Blog API Documentation

This document describes the complete CRUD (Create, Read, Update, Delete) API for blogs in the Nomad Nexus application.

## Base URL
All endpoints are prefixed with `/api/blogs`

## Authentication
Most endpoints require user authentication. Include the user ID in the request body or query parameters where required.

## Endpoints

### 1. Create Blog
**POST** `/api/blogs`

Creates a new blog post.

**Request Body:**
```json
{
  "author": "user_id_here",
  "title": "Blog Title",
  "content": "Blog content (minimum 100 characters)",
  "coverImage": "https://example.com/image.jpg",
  "tags": ["travel", "adventure", "nomad"],
  "isPublished": false
}
```

**Response:**
```json
{
  "success": true,
  "status": 201,
  "message": "Blog created successfully",
  "data": {
    "_id": "blog_id",
    "author": "user_id",
    "title": "Blog Title",
    "content": "Blog content",
    "coverImage": "https://example.com/image.jpg",
    "tags": ["travel", "adventure", "nomad"],
    "isPublished": false,
    "likes": [],
    "comments": [],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. Get All Blogs
**GET** `/api/blogs`

Retrieves a paginated list of blogs with filtering options.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `author` (optional): Filter by author ID
- `isPublished` (optional): Filter by published status (true/false)
- `tags` (optional): Filter by tags (comma-separated)
- `search` (optional): Search in title and content

**Example:**
```
GET /api/blogs?page=1&limit=5&isPublished=true&tags=travel,adventure
```

**Response:**
```json
{
  "success": true,
  "status": 200,
  "message": "Blogs retrieved successfully",
  "data": {
    "blogs": [...],
    "pagination": {
      "page": 1,
      "limit": 5,
      "total": 25,
      "totalPages": 5,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### 3. Get Blog by ID
**GET** `/api/blogs/{blogId}`

Retrieves a specific blog by its ID.

**Response:**
```json
{
  "success": true,
  "status": 200,
  "message": "Blog retrieved successfully",
  "data": {
    "_id": "blog_id",
    "author": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "https://example.com/avatar.jpg"
    },
    "title": "Blog Title",
    "content": "Blog content",
    "coverImage": "https://example.com/image.jpg",
    "tags": ["travel", "adventure"],
    "isPublished": true,
    "likes": [
      {
        "_id": "user_id",
        "name": "Jane Doe",
        "avatar": "https://example.com/avatar.jpg"
      }
    ],
    "comments": [
      {
        "_id": "comment_id",
        "user": {
          "_id": "user_id",
          "name": "Jane Doe",
          "avatar": "https://example.com/avatar.jpg"
        },
        "message": "Great blog post!",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 4. Update Blog
**PUT** `/api/blogs/{blogId}`

Updates an existing blog post.

**Request Body:**
```json
{
  "title": "Updated Blog Title",
  "content": "Updated blog content",
  "coverImage": "https://example.com/new-image.jpg",
  "tags": ["travel", "adventure", "new-tag"],
  "isPublished": true
}
```

**Response:**
```json
{
  "success": true,
  "status": 200,
  "message": "Blog updated successfully",
  "data": {
    "_id": "blog_id",
    "title": "Updated Blog Title",
    "content": "Updated blog content",
    "author": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "https://example.com/avatar.jpg"
    },
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 5. Delete Blog
**DELETE** `/api/blogs/{blogId}`

Deletes a blog post.

**Response:**
```json
{
  "success": true,
  "status": 200,
  "message": "Blog deleted successfully"
}
```

### 6. Like/Unlike Blog
**POST** `/api/blogs/{blogId}/like`

Toggles like status for a blog.

**Request Body:**
```json
{
  "userId": "user_id_here"
}
```

**Response:**
```json
{
  "success": true,
  "status": 200,
  "message": "Blog liked successfully"
}
```

### 7. Get Like Status
**GET** `/api/blogs/{blogId}/like?userId={userId}`

Gets the like status for a specific user.

**Response:**
```json
{
  "success": true,
  "status": 200,
  "message": "Like status retrieved successfully",
  "data": {
    "isLiked": true,
    "likeCount": 15
  }
}
```

### 8. Get Comments
**GET** `/api/blogs/{blogId}/comments`

Retrieves comments for a blog with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "status": 200,
  "message": "Comments retrieved successfully",
  "data": {
    "comments": [
      {
        "_id": "comment_id",
        "user": {
          "_id": "user_id",
          "name": "Jane Doe",
          "avatar": "https://example.com/avatar.jpg"
        },
        "message": "Great blog post!",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### 9. Add Comment
**POST** `/api/blogs/{blogId}/comments`

Adds a new comment to a blog.

**Request Body:**
```json
{
  "userId": "user_id_here",
  "message": "Your comment message here"
}
```

**Response:**
```json
{
  "success": true,
  "status": 201,
  "message": "Comment added successfully",
  "data": {
    "_id": "comment_id",
    "user": {
      "_id": "user_id",
      "name": "Jane Doe",
      "avatar": "https://example.com/avatar.jpg"
    },
    "message": "Your comment message here",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 10. Delete Comment
**DELETE** `/api/blogs/{blogId}/comments/{commentId}`

Deletes a specific comment (only by comment author or blog author).

**Request Body:**
```json
{
  "userId": "user_id_here"
}
```

**Response:**
```json
{
  "success": true,
  "status": 200,
  "message": "Comment deleted successfully"
}
```

### 11. Search Blogs
**GET** `/api/blogs/search`

Advanced search with multiple filtering options.

**Query Parameters:**
- `q` (optional): Search query
- `author` (optional): Filter by author ID
- `tags` (optional): Filter by tags (comma-separated)
- `isPublished` (optional): Filter by published status
- `sortBy` (optional): Sort field (createdAt, likes, comments)
- `sortOrder` (optional): Sort order (asc, desc)
- `page` (optional): Page number
- `limit` (optional): Items per page
- `minLikes` (optional): Minimum number of likes
- `dateFrom` (optional): Start date (ISO string)
- `dateTo` (optional): End date (ISO string)

**Example:**
```
GET /api/blogs/search?q=travel&tags=adventure&sortBy=likes&sortOrder=desc&minLikes=5
```

**Response:**
```json
{
  "success": true,
  "status": 200,
  "message": "Search completed successfully",
  "data": {
    "blogs": [...],
    "pagination": {...},
    "searchInfo": {
      "query": "travel",
      "filters": {...},
      "sortBy": "likes",
      "sortOrder": "desc"
    },
    "suggestions": {
      "popularTags": [
        { "tag": "travel", "count": 25 },
        { "tag": "adventure", "count": 18 }
      ]
    }
  }
}
```

### 12. Blog Statistics
**GET** `/api/blogs/stats`

Retrieves comprehensive blog statistics and analytics.

**Query Parameters:**
- `author` (optional): Filter stats by author ID

**Response:**
```json
{
  "success": true,
  "status": 200,
  "message": "Blog statistics retrieved successfully",
  "data": {
    "overview": {
      "totalBlogs": 100,
      "publishedBlogs": 85,
      "draftBlogs": 15,
      "totalLikes": 1250,
      "totalComments": 450,
      "averageLikesPerBlog": 12.5,
      "averageCommentsPerBlog": 4.5
    },
    "topContent": {
      "mostLikedBlog": {
        "title": "Amazing Travel Story",
        "likes": 45,
        "author": "John Doe"
      },
      "mostCommentedBlog": {
        "title": "Adventure Guide",
        "comments": 23,
        "author": "Jane Doe"
      }
    },
    "recentActivity": {
      "recentBlogs": [...]
    },
    "trends": {
      "popularTags": [...],
      "monthlyStats": [...]
    }
  }
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "status": 400,
  "message": "Error message here",
  "errors": "Additional error details (optional)"
}
```

## Common HTTP Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

## Validation Rules

### Blog Creation/Update
- Title: Required, max 200 characters
- Content: Required, minimum 100 characters
- Author: Required (ObjectId)
- Tags: Optional, max 10 items
- Cover Image: Optional URL

### Comments
- Message: Required, max 1000 characters
- User ID: Required

### Likes
- User ID: Required

## Notes

1. All timestamps are in ISO 8601 format
2. ObjectId fields are automatically populated with user details when using `.populate()`
3. Pagination is zero-based internally but one-based in API responses
4. Search is case-insensitive
5. Tags are stored as strings and can be searched/filtered
6. Comments and likes are embedded in the blog document for better performance 