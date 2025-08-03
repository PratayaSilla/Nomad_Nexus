import React from 'react'
import ImageUploadField from '@/common/fields/ImageUploadField'


export const TripImages = () => {
    return (
        <div className="border-2 border-dashed border-gray-400 rounded-lg px-6 py-10 text-center">
            <ImageUploadField name="previewImages" label="Trip Image" required imgHeight={200} imgWidth={330}/>
        </div>
    )
}
