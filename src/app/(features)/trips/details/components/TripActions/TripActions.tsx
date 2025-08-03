import React from 'react'
import { Share2, Link } from 'lucide-react'
import Button from '@/common/components/atoms/Button'


const TripShareOptions = () => {
    return (
        <div className='flex-1/2'>
            <div className="flex-1/2 flex justify-end gap-8 mr-4">
                <Button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-[#221d11] text-base font-bold">
                    <span className="truncate">Join Trip</span>
                </Button>
                <Button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-secondary text-white text-base font-bold">
                    <span className="truncate">Save Trip</span>
                </Button>
            </div>
            <div className="px-4 py-5 flex justify-end">
                    <Button className="flex !px-1">
                        <div className="rounded-full p-2.5 bg-highlight">
                            <Share2 size={20} className="text-text-primary" />
                        </div>
                    </Button>
                    <Button className="flex !px-1">
                        <div className="rounded-full p-2.5 bg-highlight">
                            <Link size={20} className="text-text-primary" />
                        </div>
                    </Button>
            </div>
        </div>

    )
}

export default TripShareOptions