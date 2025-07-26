import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const layout = ({ children }: LayoutProps) => {
  return (
    <div className='px-[16rem]'>   
        {children}
    </div>
  )
}

export default layout