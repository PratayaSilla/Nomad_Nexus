'use client'

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
    <div className="p-4" onClick={() => router.push(`/story/${_id}`)}>
      <div className="flex items-stretch justify-between gap-4 rounded-xl">
        <div className="flex flex-col gap-1 flex-[2_2_0px]">
          <p className="text-[#5c7a8a] text-sm">{category}</p>
          <p className="text-[#101618] text-base font-bold">{title}</p>
          <p className="text-[#5c7a8a] text-sm">{description}</p>
        </div>
        <div
          className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
          style={{ backgroundImage: `url("${imageUrl}")` }}
        ></div>
      </div>
    </div>
  )
}

export default BlogPreview