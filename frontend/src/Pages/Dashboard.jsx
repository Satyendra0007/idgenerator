import React, { useEffect, useRef, useState } from 'react';
import user from "../images/user.webp"
import { useContext } from 'react'
import { ContextStore } from '../store/ContextStore'
import Card from '../Components/Card'
import banner from "../images/banner.jpeg"
import { CiSaveDown1 } from "react-icons/ci";
import domtoimage from 'dom-to-image';
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {

  const { isLoggedIn, userData } = useContext(ContextStore)
  const cardRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn)
      navigate("/")
  }, [])

  const handleDownload = () => {
    domtoimage.toPng(cardRef.current, { bgcolor: '#fff', quality: 0.99, scale: 3, })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'id-card.png';
        link.click();
      })
      .catch((error) => {
        console.error('Error generating image:', error);
      });
  };


  return (
    <div className='min-h-[83vh]'>
      <div className="info">
        <div className="banner w-full h-52 md:h-[30rem] bg-white">
          <img className='h-full w-full' src={banner} alt="" />
        </div>
        <div className="profile container mx-auto md:max-w-7xl flex flex-col relative px-4 md:flex-row md:px-10 md:gap-10">
          <div className="image h-14 md:w-60 md:h-60">
            <img className=' w-32 h-32 md:w-60 md:h-60 rounded-full absolute -top-[30%] md:-top-[50%]' src={userData.image ? userData.image : user} alt="" />
          </div>
          <div className="info py-4 space-y-2 font-semibold ">
            <div className="name text-lg md:text-4xl font-bold text-rose-600 capitalize">{userData.name}</div>
            <div className="email text-sm md:text-base "><span>Email - </span>{userData.email}</div>
            <div className="email text-sm md:text-base"><span>Phone - </span>{userData.phone}</div>
            <div className="email text-sm md:text-base"><span>User Id - </span>{userData.userId}</div>
            <div className="email text-sm md:text-base"><span>Course - </span>{(userData.course)?.toUpperCase()}</div>
          </div>
        </div>
      </div>
      <div className="card px-2">
        <h1 className='text-2xl font-bold text-center my-8 text-gray-800'>Your IdCard </h1>
        <div className="button flex justify-center">
          <button className='flex justify-center items-center gap-1 text-lg py-2 px-20 bg-gradient-to-r from-blue-400 to bg-orange-500 text-white rounded-lg shadow-lg hover:scale-105 transition-all ease-in-out duration-200 ' onClick={handleDownload}>
            <span>Dawnload</span>
            <CiSaveDown1 />
          </button>
        </div>
        <div className="card  flex justify-center py-10">
          <div ref={cardRef} className="card rounded-xl">
            <Card  {...userData} />
          </div>
        </div>
      </div>
    </div>
  )
}
