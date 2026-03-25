import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='border-t border-slate-200/80 bg-white/40 backdrop-blur-sm'>
      <div className='mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8'>
        <div>
          <div className='font-bold text-slate-950'>IdGenerator</div>
          <div className='text-slate-600'>Create polished student IDs without manual card design work.</div>
        </div>
        <div className='flex items-center gap-4 font-semibold text-slate-600'>
          <Link to="/" className='transition hover:text-slate-950'>Home</Link>
          <Link to="/register" className='transition hover:text-slate-950'>Register</Link>
          <Link to="/login" className='transition hover:text-slate-950'>Login</Link>
        </div>
      </div>
    </footer>
  )
}
