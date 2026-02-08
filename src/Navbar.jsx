import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';
export default function MedicineDonationNavbar({refsignup,reflogin}) {
    const [showsignup,setsignup]=useState(false)
    const navigate=useNavigate()  
    function dorefsignup(){
          navigate('/signup')
        refsignup()
      }
       function doreflogin(){

       // alert()
        //reflogin()
        navigate('/login')
      }

  return (
    <>
    <div className="bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400 ">
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white">MediShare M</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#home" className="text-white hover:text-purple-200 transition-colors">Home</a>
              <a href="#about" className="text-white hover:text-purple-200 transition-colors">About</a>
              <a href="#how-it-works" className="text-white hover:text-purple-200 transition-colors">How It Works</a>
              <a href="#contact" className="text-white hover:text-purple-200 transition-colors">Contact</a>
            </nav>
            <div className="flex space-x-3">
              <button onClick={doreflogin} className="text-white border border-white/30 px-4 py-2 rounded-full font-semibold hover:bg-white/10 transition-colors">
                Login
              </button>
              <button onClick={dorefsignup} className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-purple-50 transition-colors">
                Sign Up
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