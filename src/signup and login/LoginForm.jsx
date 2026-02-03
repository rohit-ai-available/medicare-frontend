import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { server_url } from '../config/url';
const LoginForm = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setIsLoading(true)
    return newErrors;

    
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false)
      return;
    }
        //setIsLoading(ture)
       
         let url = server_url+"/user/login";
             
              let resp = await axios.post(url, formData, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
              }); 
              //alert()
       // alert(JSON.stringify(resp.data.token));
        let logintoken=resp.data.token;
       
          if(resp.data.status==true){
            alert(JSON.stringify(resp.data.msg))
            if(resp.data.obj.userType=="needy"){
               localStorage.setItem('logintoken',logintoken)
               localStorage.setItem('email',formData.email)
              navigate('/needy-navbar')
            }
          else{
             localStorage.setItem('logintoken',logintoken)
             localStorage.setItem('email',formData.email)
              navigate('/donor-navbar')
          }
            //let data=resp.data.status;
           // funref(data)
          }
          else{
         //   alert()
            alert(JSON.stringify(resp.data))
          }

    // setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    
      // Reset form
      setFormData({
        email: '',
        password: '',
        rememberMe: false
      });
    }, 150);
  };

  const handleSocialLogin = (provider) => {
    alert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login clicked!`);
  };

  const handleForgotPassword = () => {
    // const email = prompt('Enter your email address:');
    // if (email) {
    //   alert(`Password reset link sent to ${email}`);
    // }
   // alert()
     navigate('/login/forgot')
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent mb-2">
            Login 
          </h1>
          <p className="text-gray-600 text-lg">Login to your account</p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 hover:border-gray-300 ${
                errors.email ? 'border-red-500' : 'border-gray-200 focus:border-purple-500'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 pr-12 rounded-xl border-2 transition-all duration-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/20 hover:border-gray-300 ${
                  errors.password ? 'border-red-400' : 'border-gray-200 focus:border-purple-400'
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-500 transition-colors duration-200 text-sm font-medium"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="w-4 h-4 text-purple-500 border-gray-300 rounded focus:ring-purple-400"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-purple-500 hover:text-purple-600 font-medium transition-colors duration-200"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-4 rounded-xl font-semibold 
            text-lg transition-all duration-300 hover:from-purple-600 hover:to-indigo-600 hover:transform hover:-translate-y-0.5
             hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
              disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              'Login'
            )}
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => alert('Redirecting to signup page...')}
              className="text-purple-500 hover:text-purple-600 font-semibold transition-colors duration-200"
            >
              Login
            </button>
          </p>
        </div>
      </div>

      {/* <style jsx>{`
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
      `}</style> */}
    </div>
  );
};

export default LoginForm;