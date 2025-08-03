import { ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react'
import { Avatar } from '../page'

interface Reply {
  _id: string
  user: {
    name: string
    avatar: string
  }
  message: string
  createdAt: string
  likes: number
  dislikes: number
}

interface CommentProps {
  author: string
  date: string
  content: string
  likes: number
  dislikes: number
  reply?: Reply[]
  avatar: string
}

const Comment = ({ author, date, content, likes, dislikes, avatar, reply = [] }: CommentProps) => {
  return (
    <>
      <div className={`flex w-full flex-row items-start justify-start gap-3 px-4 pt-4`}>
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
            <div className="flex items-center gap-2">
              <MessageCircle size={20} className="text-[#5c7a8a]" />
              {dislikes > 0 && <p className="text-[#5c7a8a] text-sm font-normal leading-normal">{dislikes}</p>}
            </div>
          </div>
        </div>
      </div>
      <div className='flex'>
        <div>
          {reply?.map((rep) => {
            return (
              <div className={`flex w-full flex-row items-start justify-start gap-3 p-4 ml-9 pl-7 border-l-2 border-solid`} key={rep._id}>
                <Avatar src={rep.user.avatar} className="shrink-0" />
                <div className="flex h-full flex-1 flex-col items-start justify-start">
                  <div className="flex w-full flex-row items-start justify-start gap-x-3">
                    <p className="text-[#101618] text-sm font-bold leading-normal tracking-[0.015em]">{rep.user.name}</p>
                    <p className="text-[#5c7a8a] text-sm font-normal leading-normal">{rep.createdAt}</p>
                  </div>
                  <p className="text-[#101618] text-sm font-normal leading-normal">{rep.message}</p>
                  <div className="flex w-full flex-row items-center justify-start gap-9 pt-2">
                    <div className="flex items-center gap-2">
                      <ThumbsUp size={20} className="text-[#5c7a8a]" />
                      <p className="text-[#5c7a8a] text-sm font-normal leading-normal">{rep.likes}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <ThumbsDown size={20} className="text-[#5c7a8a]" />
                      {dislikes > 0 && <p className="text-[#5c7a8a] text-sm font-normal leading-normal">{rep.dislikes}</p>}
                    </div>
                  </div>
                </div>
              </div>)
          })}
        </div>
      </div>
    </>
  );
};

export default Comment