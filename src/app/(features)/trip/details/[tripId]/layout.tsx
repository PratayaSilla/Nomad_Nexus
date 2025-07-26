import React from 'react'

type Props = {
    children: React.ReactNode;
  };

const layout = ({children} : Props) => {
  return (
    <div className='px-[12rem] bg-background pb-[6rem]'>
        {children}
    </div>
  )
}

export default layout