import React from 'react'
import { FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <div className='py-4 flex justify-center items-center gap-2 font-bold bg-blue-50 text-sm ' >
     Created With <FaHeart className='text-red-700' /> By MCA 
    </div>
  )
}
