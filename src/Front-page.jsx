import React, { useState } from 'react';
import { Heart, Users, Shield, ArrowRight, Plus, Calendar, MapPin, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MedicineDonationIndex() {
  const [activeTab, setActiveTab] = useState('donate');
  const [Showsignup, setsignup] = useState(false);
  const [Showslogin, setlogin] = useState(false);
  const [ShowsMedicineform, setMedicineform] = useState(false);
  const [ShowsAvailMedi, setAvailMedi] = useState(false);
  const navigate = useNavigate();

  function dosignup() {
    navigate("/signup");
  }
   function dofunds(){
   navigate('/donate-funds')
   }
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section with Background Image */}
      <section 
        id="home" 
        className="relative py-32 bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(88, 28, 135, 0.7), rgba(59, 130, 246, 0.7)), url('https://images.unsplash.com/photo-1680759291470-9c10abc59668?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1lZGljaW5lJTIwZG9uYXRpb258ZW58MHx8MHx8fDA%3D')` 
        }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Share Medicine,
              <span className="block text-purple-200">Save Lives</span>
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto font-medium">
              Connect unused medicines with those who need them most. Join our community of compassionate donors and recipients making healthcare accessible for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={dosignup} className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition-all transform hover:scale-105 shadow-xl">
                Donate Medicine
              </button>
              <button onClick={dosignup} className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-all shadow-xl">
                Request Medicine
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-purple-100 font-medium">Medicines Donated</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">25K+</div>
              <div className="text-purple-100 font-medium">Lives Impacted</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-purple-100 font-medium">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section with Soft Pattern Background */}
      <section 
        id="how-it-works" 
        className="py-20 bg-fixed bg-cover"
        style={{ 
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070')` 
        }}
      >
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-gray-800 text-center mb-16">How It Works</h3>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="bg-purple-100 rounded-full p-2 shadow-inner">
                <button
                  onClick={() => setActiveTab('donate')}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    activeTab === 'donate' 
                      ? 'bg-purple-600 text-white shadow-md' 
                      : 'text-purple-600 hover:bg-purple-200'
                  }`}
                >
                  For Donors
                </button>
                <button
                  onClick={() => setActiveTab('request')}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    activeTab === 'request' 
                      ? 'bg-purple-600 text-white shadow-md' 
                      : 'text-purple-600 hover:bg-purple-200'
                  }`}
                >
                  For Recipients
                </button>
              </div>
            </div>

            {/* Donor/Recipient Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(activeTab === 'donate' ? [
                { icon: <Plus />, title: "List Medicine", desc: "Upload details and photos of unused medicines" },
                { icon: <Users />, title: "Get Matched", desc: "Connect with verified recipients in your area" },
                { icon: <Heart />, title: "Make Impact", desc: "Safely transfer medicine and help someone" }
              ] : [
                { icon: <Shield />, title: "Verify Identity", desc: "Complete verification for safe transactions" },
                { icon: <Calendar />, title: "Request Medicine", desc: "Search for needed medicines and submit requests" },
                { icon: <MapPin />, title: "Receive Medicine", desc: "Coordinate pickup with verified donors" }
              ]).map((item, idx) => (
                <div key={idx} className="bg-white border border-purple-100 rounded-xl p-8 text-center shadow-lg hover:shadow-2xl transition-shadow">
                  <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg text-white">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h4>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section with Side Image Layout */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
            <div className="lg:w-1/2">
              <img 
                src="https://media.istockphoto.com/id/1408430274/photo/running-a-food-bank-at-a-church.webp?a=1&b=1&s=612x612&w=0&k=20&c=MZKmWajWkA7QUircKu2C7OYRAYHFJbZgL-bFLW1UWWw=" 
                alt="Healthcare workers" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="lg:w-1/2">
              <h3 className="text-4xl font-bold text-gray-800 mb-6">About MediShare</h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Every year, millions of dollars worth of unused medicines are wasted while many people can't afford essential medications. MediShare bridges this gap by creating a secure, verified platform where generosity meets genuine need.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-lg"><Shield className="text-green-600" /></div>
                  <div>
                    <h4 className="font-bold text-gray-800">Verified & Safe</h4>
                    <p className="text-gray-600 text-sm">All users and expiry dates are strictly checked.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-2 rounded-lg"><Heart className="text-red-600" /></div>
                  <div>
                    <h4 className="font-bold text-gray-800">Community Driven</h4>
                    <p className="text-gray-600 text-sm">Built by the community, for the community.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Vibrant Background */}
      <section 
        className="py-24 bg-cover bg-fixed text-white"
        style={{ 
          backgroundImage: `linear-gradient(rgba(76, 29, 149, 0.85), rgba(76, 29, 149, 0.85)), url('https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=2070')` 
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h3>
            <p className="text-xl mb-10 text-purple-100">
              Join thousands of people who are already making healthcare more accessible in their communities.
            </p>
            <button onClick={dofunds} className="bg-white text-purple-700 px-10 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition-all transform hover:scale-105 inline-flex items-center shadow-2xl">
              Donate Funds
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 py-16 text-gray-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Heart className="h-8 w-8 text-purple-500 fill-current" />
                <span className="text-2xl font-bold text-white">MediShare</span>
              </div>
              <p className="leading-relaxed">Making healthcare accessible through community-driven medicine donation.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-purple-400 transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Support</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-purple-500" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-purple-500" />
                  <span>hello@medishare.org</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-purple-500" />
                  <span>Available Nationwide</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>&copy; 2026 MediShare. All rights reserved. Making healthcare accessible for everyone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}