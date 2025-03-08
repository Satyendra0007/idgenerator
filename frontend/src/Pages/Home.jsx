import React, { useContext, useEffect } from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Card from '../Components/Card';
import { ContextStore } from '../store/ContextStore';


export default function Home() {

  const { isLoggedIn } = useContext(ContextStore)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn)
      navigate("/dashboard")
  }, [])

  return (
    <div className='py-20 container mx-auto md:flex md:max-w-5xl md:gap-x-16 md:h-[84vh] md:items-center' >
      <div className="content  space-y-6">
        <div className="heading ">
          <h1 className='text-2xl font-bold text-center'>
            &lt; <span className='text-blue-600'>Id</span>Generator /&gt;
          </h1></div>
        <div className="desc space-y-6">
          <p className='text-gray-800 font-semibold text-center'>Easily create personalized college IDs! Just add student names, photos, and course details to instantly generate unique IDs, ready to download and print.

            Start creating your student ID now!
          </p>
          <div className="buttons">
            <Link to="/register">
              <button className='flex justify-center items-center gap-2 font-semibold px-10 py-2 border border-blue-600 text-blue-600 rounded-md shadow-xl mx-auto hover:bg-blue-600 hover:text-white transition-all duration-200 ease-in-out'>
                Start Now
                <FaArrowRight />
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="card px-3 mt-16">
        <Card />
      </div>
    </div>
  )
}
