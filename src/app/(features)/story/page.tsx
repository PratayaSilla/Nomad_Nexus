'use client'

import React, { useState } from 'react';
import BlogPreview from './components/BlogPreview';
import { ChevronLeft, ChevronRight, CirclePlus } from 'lucide-react';
import { useGetData } from '@/common/hooks/services/methods/useGETData';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Loader from '@/common/components/Loader/Loader';
import Button from '@/common/components/atoms/Button';


interface Blog {
  _id: string;
  title: string;
  content: string;
  coverImage?: string;
  imageUrl?: string;
  tags?: string[];
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function Stories() {
  const [filter, setFilter] = useState('Latest');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;

  const { data, loading } = useGetData<{ blogs: Blog[]; pagination: Pagination }>(`/api/blogs?page=${currentPage}&limit=${blogsPerPage}`);
  const blogs = data?.blogs || [];
  const filteredPosts = blogs;

  const router = useRouter()

  const { status } = useSession()


  return (
    <div>
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex w-full items-center justify-between gap-3">
          <div>
          <p className="text-text-primary text-[32px] font-bold">Traveller Stories</p>
          <p className="text-text-secondary text-sm ml-1">Explore stories and insights from fellow travelers.</p>
          </div>
          {(status === 'authenticated') && (
              <Button 
                  className='cursor-pointer flex gap-2 bg-primary rounded-lg text-text-primary' 
                  onClick={() => router.push('/story/create')}
              >
                <CirclePlus size={20}/>
                <span>Create Trip</span>
              </Button>)}
        </div>
      </div>
      <div className="flex px-4 py-3">
        <div className="flex h-10 flex-1 items-center justify-center rounded-xl bg-[#eaeef1] p-1">
          {['Latest', 'Most Popular'].map((type) => (
            <label
              key={type}
              className={`flex cursor-pointer h-full grow items-center justify-center px-2 rounded-xl text-sm font-medium text-[#5c7a8a]
                ${filter === type ? ' shadow text-[#101618]' : ''}`}
            >
              <span className="truncate">{type}</span>
              <input
                type="radio"
                name="filter"
                className="invisible w-0"
                checked={filter === type}
                onChange={() => {
                  setFilter(type);
                  setCurrentPage(1);
                }}
              />
            </label>
          ))}
        </div>
      </div>
      {loading ? (
        <Loader/>
      ) : (
        filteredPosts.map((post, index) => (
          <BlogPreview
            key={post._id || index}
            _id={post._id}
            category={post.tags?.[0] || 'Blog'}
            title={post.title}
            description={post.content?.slice(0, 120) || ''}
            imageUrl={post.coverImage || post.imageUrl || ''}
          />
        ))
      )}

      <div className="flex items-center justify-center p-4 gap-2">
        <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
          <ChevronLeft size={18} />
        </button>
        <button
          className={`rounded-full size-10 flex items-center justify-center text-sm bg-[#eaeef1] font-bold`}
        >
          {currentPage}
        </button>
        <button onClick={() => setCurrentPage((p) => p + 1)} disabled={true}>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
