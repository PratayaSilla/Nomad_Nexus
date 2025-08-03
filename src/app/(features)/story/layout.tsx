import React from 'react'
import { Navbar } from '@/common/components';


type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className='bg-background min-h-[100vh]'>
      <Navbar />
      <div className='px-[0.5rem] md:px-[16rem] '>
        {children}
      </div>
    </div>
  )
}

export default layout