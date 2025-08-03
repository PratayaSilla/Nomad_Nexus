import React from 'react'

type Props = {
    userData: {
        bio?: string
    }
  }

const UserAbout = ({ userData }: Props) => {

    return (
        <div>
            <h2 className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                About
            </h2>
            <div className="text-[#121416] text-base font-normal leading-normal pb-3 pt-1 px-4">
                <div dangerouslySetInnerHTML={{ __html: userData?.bio || '' }} />
            </div>
            <h2 className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Trip Stats</h2>
            <h2 className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">5 reviews</h2>
        </div>
    )
}

export default UserAbout