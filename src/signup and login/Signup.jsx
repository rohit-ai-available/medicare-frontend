import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, CheckCircle, XCircle, ChevronDown } from 'lucide-react';
import axios from 'axios';
import { server_url } from '../config/url';

export default function SignupComponent() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const userTypes = [
    { value: 'needy', label: 'Needy' },
    { value: 'doner', label: 'Doner' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.userType) {
      newErrors.userType = 'Please select a user type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

   const  handleSubmit = async () => {
     //  alert(JSON.stringify(formData))
      if (!validateForm()) return;
        setIsSubmitting(true);
         let url = server_url+"/user/signup";
             
              let resp = await axios.post(url, formData, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
              });
      //alert(JSON.stringify(resp.data));
          if(resp.data.status==true){
            alert(JSON.stringify(resp.data.msg))
          }
          else{
             // alert("ppppp")
            alert(JSON.stringify(resp.data))
             setIsSubmitting(false);
            return;
          }
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          email: '',
          password: '',
          userType: ''
        });
      }, 3000);
    }, 1500);
  };

  const handleChange = (e) => {
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

  const handleUserTypeSelect = (userType) => {
    setFormData(prev => ({
      ...prev,
      userType: userType.value
    }));
    setShowDropdown(false);
    
    // Clear error when user selects
    if (errors.userType) {
      setErrors(prev => ({
        ...prev,
        userType: ''
      }));
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    
    return {
      strength,
      label: labels[strength - 1] || '',
      color: colors[strength - 1] || 'bg-gray-300'
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const selectedUserType = userTypes.find(type => type.value === formData.userType);

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome aboard!</h2>
          <p className="text-gray-600">Your account has been created successfully as a {selectedUserType?.label}!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SignUp</h1>
          <p className="text-gray-600">Join us and start your journey today</p>
        </div>

        <div className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="john@example.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <XCircle className="w-4 h-4 mr-1" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Password strength:</span>
                  <span className={`font-medium ${passwordStrength.strength >= 3 ? 'text-green-600' : 'text-orange-600'}`}>
                    {passwordStrength.label}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                  />
                </div>
              </div>
            )}
            
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <XCircle className="w-4 h-4 mr-1" />
                {errors.password}
              </p>
            )}
          </div>

          {/* User Type Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User Type
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-left ${
                  errors.userType ? 'border-red-500' : 'border-gray-300'
                } ${!selectedUserType ? 'text-gray-400' : 'text-gray-900'}`}
              >
                {selectedUserType ? selectedUserType.label : 'Select user type'}
              </button>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              
              {showDropdown && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                  {userTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => handleUserTypeSelect(type)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {errors.userType && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <XCircle className="w-4 h-4 mr-1" />
                {errors.userType}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating Account...
              </div>
            ) : (
              'Sign in'
            )}
          </button>
        </div>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}