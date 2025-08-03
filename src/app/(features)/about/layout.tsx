import React from 'react'
import { Navbar } from '@/common/components';


type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className='bg-background'>
      <Navbar />
      <div className='px-[12rem] pb-[6rem]'>
        {children}
      </div>
    </div>
  )
}

export default layout