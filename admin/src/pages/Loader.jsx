import React from 'react'
import { LoaderIcon } from 'lucide-react'

const Loader = () => {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <LoaderIcon className='animate-spin text-indigo-500' size={45} />
    </div>
  )
}

export default Loader