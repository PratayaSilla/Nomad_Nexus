'use client'

import React from 'react';
import { useGetData } from '@/common/hooks/services/methods/useGETData';
import { Heart, MessageCircle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useParams } from 'next/navigation';

interface AvatarProps {
  src: string
  size?: string
  className?: string
}

interface CommentProps {
  author: string
  date: string
  content: string
  likes: number
  dislikes: number
  isReply?: boolean
  avatar: string
}

// Reusable components
const Avatar = ({ src, size = 'w-10 h-10', className = '' }: AvatarProps) => {
  return (
    <div
      className={`bg-center bg-no-repeat bg-cover rounded-full ${size} ${className}`}
      style={{ backgroundImage: `url("${src}")` }}
    />
  );
};


const Comment = ({ author, date, content, likes, dislikes, isReply = false, avatar }: CommentProps) => {
  return (
    <div className={`flex w-full flex-row items-start justify-start gap-3 p-4 ${isReply ? 'pl-[68px]' : ''}`}>
      <Avatar src={avatar} className="shrink-0" />
      <div className="flex h-full flex-1 flex-col items-start justify-start">
        <div className="flex w-full flex-row items-start justify-start gap-x-3">
          <p className="text-[#101618] text-sm font-bold leading-normal tracking-[0.015em]">{author}</p>
          <p className="text-[#5c7a8a] text-sm font-normal leading-normal">{date}</p>
        </div>
        <p className="text-[#101618] text-sm font-normal leading-normal">{content}</p>
        <div className="flex w-full flex-row items-center justify-start gap-9 pt-2">
          <div className="flex items-center gap-2">
            <ThumbsUp size={20} className="text-[#5c7a8a]" />
            <p className="text-[#5c7a8a] text-sm font-normal leading-normal">{likes}</p>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsDown size={20} className="text-[#5c7a8a]" />
            {dislikes > 0 && <p className="text-[#5c7a8a] text-sm font-normal leading-normal">{dislikes}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

interface Blog {
  _id: string;
  author: {
    _id: string;
    name: string;
    email: string;
    avatar: string;
  };
  title: string;
  content: string;
  coverImage?: string;
  tags?: string[];
  isPublished: boolean;
  likes: Array<{ _id: string; name: string; avatar?: string }>;
  comments: Array<{
    _id: string;
    user: { _id: string; name: string; avatar?: string };
    message: string;
    createdAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

const BlogDetail = () => {
  const { blogID } = useParams();
  const { data, loading } = useGetData<Blog>(`/api/blogs/${blogID}`);

  if (loading) return <div className="p-8 text-center">Loading blog...</div>;
  if (!data) return <div className="p-8 text-center">Blog not found.</div>;

  const blog = data;

  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div className="flex flex-wrap gap-2 pb-2">
        {blog.tags?.map((tag) => (
          <span key={tag} className="text-[#5c7a8a] text-xs font-medium bg-[#eaeef1] rounded px-2 py-1 mr-2">#{tag}</span>
        ))}
      </div>
      <h1 className="text-[#101618] text-[28px] font-bold leading-tight pb-2">{blog.title}</h1>
      <div className="flex items-center gap-3 pb-2">
        <Avatar src={blog.author.avatar} />
        <span className="text-[#101618] text-sm font-bold">{blog.author.name}</span>
        <span className="text-[#5c7a8a] text-xs">{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
      {blog.coverImage && (
        <div className="w-full aspect-[3/2] bg-center bg-no-repeat bg-cover rounded-lg my-4" style={{ backgroundImage: `url('${blog.coverImage}')` }} />
      )}
      <p className="text-[#101618] text-base font-normal leading-normal pb-3 pt-1">
        {blog.content}
      </p>
      <div className="flex flex-wrap gap-4 py-2">
        <div className="flex items-center gap-2 px-3 py-2">
          <Heart className="text-[#5c7a8a]" />
          <p className="text-[#5c7a8a] text-[13px] font-bold">{blog.likes.length}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2">
          <MessageCircle className="text-[#5c7a8a]" />
          <p className="text-[#5c7a8a] text-[13px] font-bold">{blog.comments.length}</p>
        </div>
      </div>
      <div className="pt-2">
        <h4 className="text-[#101618] text-lg font-bold pb-2">Comments</h4>
        {blog.comments.slice(0, 2).map((comment) => (
          <Comment
            key={comment._id}
            author={comment.user.name}
            date={new Date(comment.createdAt).toLocaleDateString()}
            content={comment.message}
            likes={0}
            dislikes={0}
            avatar={comment.user.avatar || ''}
          />
        ))}
      </div>
    </div>
  );
};

// Main App component
const DetailBlog = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-gray-50 group/design-root overflow-x-hidden" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 flex flex-1 justify-center py-5">
          <BlogDetail />
        </div>
      </div>
    </div>
  );
};

export default DetailBlog;