'use client'

import Button from '@/common/components/atoms/Button';
import ImageUploadField from '@/common/fields/ImageUploadField';
// import TextEditor from '@/common/components/TextEditor/TextEditor';
import InputField from '@/common/fields/Input';
import React from 'react'
import {Form} from 'react-final-form'
import { notify } from '@/common/utils/notify';
import { useSession } from 'next-auth/react';
import { usePOSTData } from '@/common/hooks/services/methods/useSmartPostMutation';

const BlogForm = () => {

    const { data: session } = useSession()

    const { postData, loading, error } = usePOSTData(
        '/api/blogs/create',
        {
            onSuccess : () => notify.success("Story Published!"),
        }
    );

    interface BlogFormValues {
      title?: string;
      content?: string;
      coverImage?: string;
      tags?: string;
      isPublished?: string;
    }

    const onSubmit = async (values: BlogFormValues) => {
      const { tags, ...rest } = values;
      await postData({
        ...rest,
        author: session?.user?._id,
        tags: typeof tags === 'string'
          ? tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
          : [],
      });
    };



  return (
    <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Write a new Story</h1>
        <Form
            onSubmit={ onSubmit }
            render={({ handleSubmit, pristine }) => (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <InputField
                        name='title'
                        placeholder='Name for your story'
                        required={true}
                        label='Blog Title'
                    />
                    <InputField
                        name='content'
                        placeholder='Show up your creativity'
                        required={true}
                        label='Blog Content'
                        textarea={true}
                    />
                    <ImageUploadField
                        name='coverImage'
                        label='Choose a Cover Image for your story'
                        required={true}
                    />
                    <InputField
                        name='tags'
                        label='Add tags to help people find your story'
                    />
                    <InputField
                        name='isPublished'
                        label='Your Story Status'
                        required={true}
                        type='select'
                        options={[
                            {
                                label : "Draft",
                                value : "false"
                            },
                            {
                                label : "Published",
                                value : "true"
                            }
                    ]}
                    />
                    <div className="pt-4 flex">
                    <Button 
                            type='submit' 
                            disabled={loading || pristine}
                            className="w-full border-2 border-solid border-black rounded-2xl"
                        >
                            {loading ? 'Saving Draft...' : 'Draft'}
                        </Button>
                        <Button 
                            type='submit' 
                            disabled={loading || pristine}
                            className="w-full bg-black text-white rounded-2xl"
                        >
                            {loading ? 'Publishing...' : 'Publish'}
                        </Button>
                    </div>
                    {error && <div className='text-red-500'>{error}</div>}
                </form>
            )}
        />
    </div>
  )
}

export default BlogForm