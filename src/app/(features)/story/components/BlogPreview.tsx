'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface BlogPreviewProps {
  category: string
  title: string
  description: string
  imageUrl: string
  _id : string
}

const BlogPreview = ({ category, title, description, imageUrl, _id }: BlogPreviewProps) => {
  const router = useRouter()

  return (
    <div className="p-4 hover:bg-[#ffe4a2] cursor-pointer rounded-2xl md:mx-8 md:px-8" onClick={() => router.push(`/story/${_id}`)}>
      <div className="flex items-stretch justify-between gap-4 rounded-xl">
        <div className="flex flex-col gap-1 flex-[2_2_0px]">
          <p className="text-text-secondary text-sm">#{category}</p>
          <p className="text-text-primary text-sm md:text-base font-bold">{title}</p>
          <p className="text-text-secondary text-xs md:text-sm">{description}</p>
        </div>
        <div className='w-[45%] md:w-[30%]'>        
          <Image src={imageUrl} alt='Cover Image' unoptimized width={100} height={100} className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1  cursor-pointer"/>
        </div>
        <div
        ></div>
      </div>
    </div>
  )
}

export default BlogPreview