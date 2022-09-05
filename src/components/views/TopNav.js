import React from 'react'
import alert from '../assets/bell-solid.svg'
export default function TopNav() {
  return (
    <div className='flex justify-end space-x-4  bg-zinc-100'>
        
         <div className='mt-5 bg-black'>
            <img src={alert}  alt="check"/>
        </div>
        <div className='mt-5'>
            <p className='inline-block '>Hello Abudi</p>
        </div>
       
        <div className="m-3 flex -space-x-2 overflow-hidden">
            <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
        </div>
    </div>
  )
}
