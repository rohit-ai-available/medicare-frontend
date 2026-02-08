import React, { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function MedicineDonationNavbar({refsignup, reflogin}) {
    const [showsignup, setsignup] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    
    function dorefsignup(){
        navigate('/signup');
        refsignup();
        setIsMobileMenuOpen(false);
    }
    
    function doreflogin(){
        navigate('/login');
        setIsMobileMenuOpen(false);
    }

    return (
        <>
        <div className="bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400">
            <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Heart className="h-8 w-8 text-white" />
                            <h1 className="text-2xl font-bold text-white">MediShare M</h1>
                        </div>
                        
                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-6">
                            <a href="#home" className="text-white hover:text-purple-200 transition-colors">Home</a>
                            <a href="#about" className="text-white hover:text-purple-200 transition-colors">About</a>
                            <a href="#how-it-works" className="text-white hover:text-purple-200 transition-colors">How It Works</a>
                            <a href="#contact" className="text-white hover:text-purple-200 transition-colors">Contact</a>
                        </nav>
                        
                        {/* Desktop Buttons */}
                        <div className="hidden md:flex space-x-3">
                            <button onClick={doreflogin} className="text-white border border-white/30 px-4 py-2 rounded-full font-semibold hover:bg-white/10 transition-colors">
                                Login
                            </button>
                            <button onClick={dorefsignup} className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-purple-50 transition-colors">
                                Sign Up
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden mt-4 pb-4 space-y-4">
                            <nav className="flex flex-col space-y-3">
                                <a 
                                    href="#home" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-white hover:text-purple-200 transition-colors py-2"
                                >
                                    Home
                                </a>
                                <a 
                                    href="#about" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-white hover:text-purple-200 transition-colors py-2"
                                >
                                    About
                                </a>
                                <a 
                                    href="#how-it-works" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-white hover:text-purple-200 transition-colors py-2"
                                >
                                    How It Works
                                </a>
                                <a 
                                    href="#contact" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-white hover:text-purple-200 transition-colors py-2"
                                >
                                    Contact
                                </a>
                            </nav>
                            
                            <div className="flex flex-col space-y-3 pt-3 border-t border-white/20">
                                <button 
                                    onClick={doreflogin} 
                                    className="text-white border border-white/30 px-4 py-2 rounded-full font-semibold hover:bg-white/10 transition-colors w-full"
                                >
                                    Login
                                </button>
                                <button 
                                    onClick={dorefsignup} 
                                    className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-purple-50 transition-colors w-full"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </header>
        </div>
        <Outlet></Outlet>
        </>
    );
}