import React from 'react'
import notfoundGif from '../assets/not-found.gif'
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className='h-[calc(100vh-4rem)] flex flex-col items-center justify-center'>
        <img className='max-h-96 bg-cover' src={notfoundGif} alt="404" />
        <Link to={'/'} className='text-lg font-inconsolata text-slate-600 font-light '>Page not found return to <span className=' text-slate-500  text-lg font-medium underline cursor-pointer'>Home page</span></Link>
    </div>
  )
}

export default PageNotFound;