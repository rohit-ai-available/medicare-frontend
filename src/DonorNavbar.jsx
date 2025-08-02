import React from 'react';
import { Bell, Search, User, Heart } from 'lucide-react';
import { Outlet } from 'react-router-dom';

export default function DonorNavbar() {

  return ( 
    <>
    <nav className="bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400 shadow-lg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg backdrop-blur-sm">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold">DonorHub</h1>
              <p className="text-xs text-white/80">Dashboard</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-white/90 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
              Home
            </a>
            <a href="#" className="text-white/90 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
              Donations
            </a>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
       

            {/* Notifications */}
            <button className="relative p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>

            {/* Profile */}
            <div className="flex items-center space-x-2 p-2 text-white/90">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <Outlet></Outlet>
    </>
  );
}