import React from 'react'
import { Navbar } from '@/common/components';


type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className='bg-background min-h-[100vh]'>
      <Navbar />
      <div className='px-[1rem] md:px-[30%] pb-[6rem]'>
        {children}
      </div>
    </div>
  )
}

export default layout