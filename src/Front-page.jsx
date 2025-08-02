import React, { useState } from 'react';
import { Heart, Users, Shield, ArrowRight, Plus, Calendar, MapPin, Phone, Mail } from 'lucide-react';
export default function MedicineDonationIndex() {
  const [activeTab, setActiveTab] = useState('donate');
    const [Showsignup,setsignup]=useState(false)
    const [Showslogin,setlogin]=useState(false)
     const [ShowsMedicineform,setMedicineform]=useState(false)
      const [ShowsAvailMedi,setAvailMedi]=useState(false)
  function dosignup(){
      alert()
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400">
      {/* Header */}

      {/* Hero Section */}
      <section id="home" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Share Medicine,
              <span className="block text-purple-100">Save Lives</span>
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Connect unused medicines with those who need them most. Join our community of compassionate donors and recipients making healthcare accessible for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-50 transition-all transform hover:scale-105">
                Donate Medicine
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all">
                Request Medicine
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-purple-100">Medicines Donated</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">25K+</div>
              <div className="text-purple-100">Lives Impacted</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-purple-100">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-white text-center mb-16">How It Works</h3>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <button
                  onClick={() => setActiveTab('donate')}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    activeTab === 'donate' 
                      ? 'bg-white text-purple-600' 
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  For Donors
                </button>
                <button
                  onClick={() => setActiveTab('request')}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    activeTab === 'request' 
                      ? 'bg-white text-purple-600' 
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  For Recipients
                </button>
              </div>
            </div>

            {activeTab === 'donate' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">List Medicine</h4>
                  <p className="text-purple-100">Upload details and photos of unused medicines with expiry dates</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Get Matched</h4>
                  <p className="text-purple-100">We connect you with verified recipients in your area</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Make Impact</h4>
                  <p className="text-purple-100">Safely transfer medicine and help someone in need</p>
                </div>
              </div>
            )}

            {activeTab === 'request' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Verify Identity</h4>
                  <p className="text-purple-100">Complete verification process to ensure safe transactions</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Request Medicine</h4>
                  <p className="text-purple-100">Search for needed medicines and submit requests</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Receive Medicine</h4>
                  <p className="text-purple-100">Coordinate pickup or delivery with verified donors</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold text-white mb-8">About MediShare</h3>
            <p className="text-xl text-white/90 mb-8">
              Every year, millions of dollars worth of unused medicines are wasted while many people can't afford essential medications. MediShare bridges this gap by creating a secure, verified platform where generosity meets genuine need.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Shield className="h-12 w-12 text-white mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Verified & Safe</h4>
                <p className="text-purple-100">All users are verified and all medicines are checked for safety and expiry dates</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Heart className="h-12 w-12 text-white mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Community Driven</h4>
                <p className="text-purple-100">Built by the community, for the community. Every donation creates a ripple of positive impact</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-4xl font-bold text-white mb-6">Ready to Make a Difference?</h3>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of people who are already making healthcare more accessible in their communities.
            </p>
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-50 transition-all transform hover:scale-105 inline-flex items-center">
              Start Donating Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-white/10 backdrop-blur-sm border-t border-white/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-white" />
                <span className="text-xl font-bold text-white">MediShare</span>
              </div>
              <p className="text-purple-100">Making healthcare accessible through community-driven medicine donation.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-purple-100">
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-purple-100">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-purple-100">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>hello@medishare.org</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Available Nationwide</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-purple-100">
            <p>&copy; 2025 MediShare. All rights reserved. Making healthcare accessible for everyone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}