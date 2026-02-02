import { ReactNode } from 'react'

const Divider = ({ children }: { children: ReactNode }) => {
  return (
    <div className='w-full flex items-center gap-2 opacity-40 my-4'>
      <hr className='flex-1'/>
      {children}
      <hr className='flex-1'/>
    </div>
  )
}

export default Divider