import React, { useState } from 'react';
import axios from 'axios';
import { server_url } from '../config/url';
const MedicineFormAvail = ({ funref }) => {
  const [formData, setFormData] = useState({
    email: '',
    medicine: '',
    company: '',
    expiryDate: '',
    packing: '',
    quantity: '',
    city:"",
    otherInfo: ''

     
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.medicine) {
      newErrors.medicine = 'Medicine name is required';
    }
    
    if (!formData.company) {
      newErrors.company = 'Company name is required';
    }
    
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    }
    
    if (!formData.packing) {
      newErrors.packing = 'Packing information is required';
    }
    
    if (!formData.quantity) {
      newErrors.quantity = 'quantity is required';
    }
       if (!formData.city) {
      newErrors.city = 'city name is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (action) => {
   if(action=='update'){
         let url = server_url+"/user/availmediupdate";
         let resp = await axios.post(url, formData, {
             headers: { "Content-Type": "application/x-www-form-urlencoded" },
                 });

                  if(resp.data.status==true){
            alert(JSON.stringify(resp.data.msg))
          }
          else{
            alert(JSON.stringify(resp.data))
          }
    alert("Record updated")
    return;
   }
   alert()
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
            
         let url = server_url+"/user/availmedi";
             
              let resp = await axios.post(url, formData, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
              });
      //alert(JSON.stringify(resp.data));
          if(resp.data.status==true){
            alert(JSON.stringify(resp.data.msg))
            alert(resp.data.token)
            localStorage.setItem("token",resp.data.token)
          }
          else{
            alert(JSON.stringify(resp.data))
          }   
      // Simulate API call for demo purposes
      // In your actual implementation, use axios.post(url, formData, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
      
      setTimeout(() => {
        const mockResponse = {
          data: {
            status: true,
            msg: `Medicine ${action === 'register' ? 'registered' : 'updated'} successfully!`
          }
        };

        if (mockResponse.data.status === true) {
          alert(JSON.stringify(mockResponse.data.msg));
          if (funref) {
            funref(mockResponse.data.status);
          }
          
          // Reset form on successful registration
          if (action === 'register') {
            setFormData({
              email: '',
              medicine: '',
              company: '',
              expiryDate: '',
              packing: '',
              quantity: '',
              otherInfo: ''
            });
          }
        } else {
          alert(JSON.stringify(mockResponse.data));
        }
        
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      alert('Error: ' + error.message);
      setIsLoading(false);
    }
  };
     // update 
     function doUpdate(){
      alert()
     }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-blue-300 to-indigo-400  bg-gradflex flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 w-full max-w-3xl border border-white/20 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent mb-2">
            Medicine Availability Form
          </h1>
          <p className="text-gray-600 text-base">Register or update medicine information</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Row 1: Email */}
          <div className="grid grid-cols-1 gap-3">
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 hover:border-gray-300 ${
                  errors.email ? 'border-red-500' : 'border-gray-200 focus:border-green-500'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Row 2: Medicine, Company, Expiry Date */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label htmlFor="medicine" className="block text-sm font-semibold text-gray-700">
                Medicine Name
              </label>
              <input
                type="text"
                id="medicine"
                name="medicine"
                value={formData.medicine}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 hover:border-gray-300 ${
                  errors.medicine ? 'border-red-500' : 'border-gray-200 focus:border-green-500'
                }`}
                placeholder="Enter medicine name"
              />
              {errors.medicine && (
                <p className="text-red-400 text-xs mt-1">{errors.medicine}</p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="company" className="block text-sm font-semibold text-gray-700">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 hover:border-gray-300 ${
                  errors.company ? 'border-red-500' : 'border-gray-200 focus:border-green-500'
                }`}
                placeholder="Enter company name"
              />
              {errors.company && (
                <p className="text-red-400 text-xs mt-1">{errors.company}</p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="expiryDate" className="block text-sm font-semibold text-gray-700">
                Expiry Date
              </label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 hover:border-gray-300 ${
                  errors.expiryDate ? 'border-red-500' : 'border-gray-200 focus:border-green-500'
                }`}
              />
              {errors.expiryDate && (
                <p className="text-red-400 text-xs mt-1">{errors.expiryDate}</p>
              )}
            </div>
          </div>

          {/* Row 3: Packing (Combo Box), City */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label htmlFor="packing" className="block text-sm font-semibold text-gray-700">
                Packing
              </label>
              <select
                id="packing"
                name="packing"
                value={formData.packing}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 hover:border-gray-300 ${
                  errors.packing ? 'border-red-500' : 'border-gray-200 focus:border-green-500'
                }`}
              >
                <option value="">Select packing type</option>
                <option value="Tablet">Tablet</option>
                <option value="Bottle">Bottle</option>
                <option value="Tube">Tube</option>
                <option value="Injection">Injection</option>
                <option value="Capsule Strip">Capsule Strip</option>
                <option value="Sachet">Sachet</option>
                <option value="Dropper Bottle">Dropper Bottle</option>
                <option value="Ampoule">Ampoule</option>
                <option value="Spray">Spray</option>
                <option value="Powder">Powder</option>
              </select>
              {errors.packing && (
                <p className="text-red-400 text-xs mt-1">{errors.packing}</p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700">
              Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 hover:border-gray-300 ${
                  errors.quantity ? 'border-red-500' : 'border-gray-200 focus:border-green-500'
                }`}
                placeholder="quantity **"
              />
              {errors.quantity && (
                <p className="text-red-400 text-xs mt-1">{errors.quantity}</p>
              )}
            </div>

                    <div className="space-y-1">
              <label htmlFor="city" className="block text-sm font-semibold text-gray-700">
              city
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 hover:border-gray-300 ${
                  errors.city ? 'border-red-500' : 'border-gray-200 focus:border-green-500'
                }`}
                placeholder="enter your city **"
              />
              {errors.city && (
                <p className="text-red-400 text-xs mt-1">{errors.city}</p>
              )}
            </div>
          </div>

          {/* Row 4: Other Information */}
          <div className="grid grid-cols-1 gap-3">
            <div className="space-y-1">
              <label htmlFor="otherInfo" className="block text-sm font-semibold text-gray-700">
                Other Information
              </label>
              <textarea
                id="otherInfo"
                name="otherInfo"
                value={formData.otherInfo}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 rounded-lg border-2 transition-all duration-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 hover:border-gray-300 border-gray-200 focus:border-green-500 resize-none"
                placeholder="Enter any additional information about the medicine..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-3">
            <button
              onClick={() => handleSubmit ('register')}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 px-4 rounded-lg font-semibold 
              text-base transition-all duration-300 hover:from-green-600 hover:to-teal-600 hover:transform hover:-translate-y-0.5
               hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2
                disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                'Register'
              )}
            </button>

            <button
              onClick={() => handleSubmit('update')}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-4 rounded-lg font-semibold 
              text-base transition-all duration-300 hover:from-blue-600 hover:to-indigo-600 hover:transform hover:-translate-y-0.5
               hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Updating...</span>
                </div>
              ) : (
                'Update'
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MedicineFormAvail;