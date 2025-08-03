'use client'

import React, { useEffect } from 'react';
import { useGetData } from '@/common/hooks/services/methods/useGETData';
import { Heart, Send, Bookmark } from 'lucide-react';
import { useParams } from 'next/navigation';
import Loader from '@/common/components/Loader/Loader';
import Comment from './components/Comments';
import InputField from '@/common/fields/Input';
import { Form } from 'react-final-form';
import Image from 'next/image';
import { usePOSTData } from '@/common/hooks/services/methods/useSmartPostMutation';
import { useSession } from 'next-auth/react';
import { notify } from '@/common/utils/notify';
import Button from '@/common/components/atoms/Button';

interface AvatarProps {
  src: string
  size?: string
  className?: string
}

interface FormValues {
  comment: string;
};


export const Avatar = ({ src, size = 'w-10 h-10', className = '' }: AvatarProps) => {
  return (
    <div
      className={`bg-center bg-no-repeat bg-cover rounded-full ${size} ${className}`}
      style={{ backgroundImage: `url("${src}")` }}
    />
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
  const { data : blog, loading } = useGetData<Blog>(`/api/blogs/${blogID}`);
  
  const { data : userData }= useSession()
  
  const {postData  , error , loading : submitLoading} = usePOSTData('/api/blogs/addComment',{
      onSuccess : () => notify.success('Commend addded successfully!')
  })
  
  const onSubmit = (values: FormValues) => {
    postData({comment : values.comment, blogId : blogID, user: userData?.user?._id})
  };
  
  useEffect(() => {
    if (error) {
      notify.error(error)
    }
  },[error])
  
  if (loading) return <Loader />;

  if (!blog) return <div className="p-8 text-center text-text-primary text-4xl">Story not found.</div>;


  const avatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTNEojJIdxF11GQ6VAmp9VrrjYuPK105WKglnOCn2NnrNhoO_CYRmaLz9vmoGdIvtol-_m-Endz_Pyu-OSt61nNctE3RS95DMak8g3ByqBIDmv-Ya3ZrwXzuxHkHJB44Q9BwAXlrZPQdKyaNAHNxVhYOOhEgZS_yoLvgVxvZfSyliXO2btqG6XsFomx6GXo_BMGcebx4QpBJLoXj9UhP7tezwkQAeSdrWELgURp9Z_618MZ8L7SMXHQyhxkVdhEn_P9DoIiMPmDQ7i'

  return (
    <div className="flex flex-col max-w-[960px] ">
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
      <div className='h-[28rem] overflow-hidden rounded-xl'>
        <Image src={blog.coverImage || ""} width={100} height={100} unoptimized alt='Cover Image' className="w-full aspect-video " />
      </div>
      <p className="text-[#101618] text-base font-normal leading-normal pb-3 pt-1 px-2w mt-4">
        {blog.content}
      </p>
      <div className="flex flex-wrap gap-4 px-4 py-2 ">
        <div className="flex items-center justify-center gap-2 px-3 py-2">
          <Heart />
          <p className="text-[13px] font-bold leading-normal tracking-[0.015em]">{blog.likes.length}</p>
        </div>
        <div className="flex items-center justify-center gap-2 px-3 py-2">
          <Send />
        </div>
        <div className="flex items-center justify-center gap-2 px-3 py-2">
          <Bookmark />
        </div>
      </div>
      <h3 className="text-[#101618] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Comments</h3>
      {[
        {
          _id: '1',
          user: {
            name: 'John Doe',
            avatar: avatar,
          },
          message: 'Great post!',
          createdAt: '2025-07-25T12:00:00Z',
          likes: 3,
          dislikes: 0,
          reply: [{
            _id: '2',
            user: {
              name: 'Jane Smith',
              avatar: avatar,
            },
            message: 'Thanks for the info!',
            createdAt: '2025-07-26T10:30:00Z',
            likes: 1,
            dislikes: 0,
          },
          {
            _id: '3',
            user: {
              name: 'Jane Smith',
              avatar: avatar,
            },
            message: 'Thanks for the info!',
            createdAt: '2025-07-26T10:30:00Z',
            likes: 1,
            dislikes: 0,
          },
          ]
        },
        {
          _id: '2',
          user: {
            name: 'Jane Smith',
            avatar: avatar,
          },
          message: 'Thanks for the info!',
          createdAt: '2025-07-26T10:30:00Z',
          likes: 1,
          dislikes: 0,
          reply: []
        },
      ].slice(0, 2).map((comment) => (
        <Comment
          key={comment._id}
          author={comment.user.name}
          date={new Date(comment.createdAt).toLocaleDateString()}
          content={comment.message}
          likes={0}
          dislikes={0}
          avatar={comment.user.avatar || ''}
          reply={comment.reply}
        />
      ))}
      <div className="flex items-center px-4 py-3 gap-3">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0"
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD68gKan8GzQbu2AWp6YJluBQZ_mnRDtE0CiJtWd1i8nDY6fI5E2MBswSA7EVvJEii0ku-pt76mKiSv4Xp6G0hujyXwcWOyTMEHab3DO1_qIWKa57z7S9qgbVp52jRQuEMEyT9OPhPB3t3MqzuVQitOg6PPQYTRHXN-tHIysKTbfqJgS62-0MhSuyUTvYmoqsNj0KJHtk8tZh8XjUcCoIbU_E0ApRYhec2oqOvZXPdJPqK3VJ5SCoTWdmUVZwHUFGvE7TiCwDfYByGe")' }}
        ></div>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className='flex gap-2 relative w-[70%]'>
              <InputField
                name='comment'
                label=''
                className='w-full'
                placeholder='Add a comment'
              />
              <Button type='submit' disabled={submitLoading} className='bg-primary rounded-xl absolute right-2 top-1'>Add</Button>
            </form>
          )}
        />
      </div>
      <h3 className="text-[#101618] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">About the Author</h3>
      <div className="flex p-4 @container">
        <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
          <div className="flex gap-4">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA9kbQFx6X5HZGdFt8Eep0-h6p7PaOjLrnWGQDqY-Zup3r0LoatV6PxvH3KtFZ1t7hyUF9B-02khWp5yHbfelAP_4mCyM5ziPKh3sCF6YqUJjz0XCzJ-PJmlKpIsng1l3k4Vzy1SNwz-mj1AqKHwMHWobTq1GAKly2MBoD5BX4gDKnk7SioaBYSim2pofq8jkEPqApIk0RmmiYlEWxQPyjVd-FO0WKLDgSNTYHXyW7_P_ZNmwA7zw3azqvDPD-yfJsg7lG6ovYyqVu8")' }}
            ></div>
            <div className="flex flex-col justify-center">
              <p className="text-[#101618] text-[22px] font-bold leading-tight tracking-[-0.015em]">Amelia Harper</p>
              <p className="text-[#5c7a8a] text-base font-normal leading-normal">
                Travel enthusiast and solo adventurer. Sharing my experiences and tips to inspire others to explore the world on their own terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const DetailBlog = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 flex flex-1 justify-center py-5">
          <BlogDetail />
        </div>
      </div>
    </div>
  );
};

export default DetailBlog;