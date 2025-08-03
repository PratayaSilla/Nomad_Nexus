import React from 'react'
import { Navbar } from '@/common/components';


type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className='bg-background min-h-screen'>
      <Navbar />
      <div className='px-[2rem] md:px-[12rem]'>
        {children}
      </div>
    </div>
  )
}

export default layout