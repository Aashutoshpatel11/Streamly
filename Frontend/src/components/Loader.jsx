import React from 'react'

function Loader() {
  return (
    <div className='flex w-full justify-center items-center p-4' >
        <div className=' rounded-full w-4 h-4 border-t border-r border-b border-white animate-spin' ></div>
    </div>
  )
}

export default Loader