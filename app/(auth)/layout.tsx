import React from 'react'

type Props = {
    children:React.ReactNode
}

export default function layout({children}: Props) {
  return (
    <div className='flex w-full justify-center items-center h-screen ' >
        {children}
    </div>
  )
}