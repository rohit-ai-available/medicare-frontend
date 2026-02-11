import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';
export default function MedicineDonationNavbar({}) {
    const [showsignup,setsignup]=useState(false)
    const navigate=useNavigate()  
    function dorefsignup(){
          navigate('/')
      }

  return (
    <>
    <div className=' bg-gradient-to-r from-purple-500 to-indigo-500'>
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white">MediShare</h1>
            </div>
            <div className="flex space-x-3">
              <button onClick={dorefsignup} className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-purple-50 transition-colors">
                home
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
    <Outlet></Outlet>
    </>
  );
}