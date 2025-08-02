import React, { useState, useEffect } from 'react';
import { Phone, User, Heart } from 'lucide-react';

export default function MedicineDonorContact() {
  const [contactNumber, setContactNumber] = useState('');
   let Number=localStorage.getItem('contact')
   //alert(Number)
  useEffect(() => {
    // Get contact number from localStorage
    const storedContact = localStorage.getItem('donorContact') || 'No contact available';
    setContactNumber(storedContact);
  }, []);

  return (
    <div className="min-h-screen  bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-200  flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Medicine Donor Contact</h2>
          <p className="text-gray-600">Enter donor's contact information</p>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center justify-center space-x-4">
              <div className="bg-white rounded-full p-3 shadow-sm">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Donor Contact</p>
                <p className="text-2xl font-bold text-gray-800 tracking-wide">
                  {Number}
                </p>
              </div>
            </div>
            
            {contactNumber && contactNumber !== 'No contact available' && (
              <div className="mt-6 pt-4 border-t border-blue-200">
                <a
                  href={`tel:${contactNumber}`}
                  className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-4 rounded-lg font-medium text-center block hover:from-blue-600 hover:to-green-600 transition-all duration-200 transform hover:scale-105 shadow-md"
                >
                  <Phone className="w-5 h-5 inline mr-2" />
                  Call Donor
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Thank you for connecting with medicine donors 💊
          </p>
        </div>
      </div>
    </div>
  );
}