import React, { useState } from 'react';
import axios from 'axios';
import { Lock, Mail, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { server_url } from '../config/url';

const ChangePasswordForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Current password validation
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    // New password validation
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'New password must be at least 8 characters long';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Check if new password is same as current
    if (formData.currentPassword && formData.newPassword && formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    //  axios request
         alert()
      let url = server_url+"/user/dochangePassword";
             
              let resp = await axios.post(url,formData, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
              });
              if(resp.data.status==true){
                alert(resp.data.msg)
              }
              else{
                alert(resp.data.msg)
              }
    setIsSubmitting(true);
    setErrors({});
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitSuccess(true);
      setFormData({
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error) {
      setErrors({ submit: 'Failed to change password. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      icon: <Mail className="w-5 h-5" />,
      placeholder: 'Enter your email address',
      showToggle: false
    },
    {
      id: 'currentPassword',
      label: 'Current Password',
      type: showPasswords.current ? 'text' : 'password',
      icon: <Lock className="w-5 h-5" />,
      placeholder: 'Enter your current password',
      showToggle: true,
      toggleField: 'current'
    },
    {
      id: 'newPassword',
      label: 'New Password',
      type: showPasswords.new ? 'text' : 'password',
      icon: <Lock className="w-5 h-5" />,
      placeholder: 'Enter your new password',
      showToggle: true,
      toggleField: 'new'
    },
    {
      id: 'confirmPassword',
      label: 'Confirm New Password',
      type: showPasswords.confirm ? 'text' : 'password',
      icon: <Lock className="w-5 h-5" />,
      placeholder: 'Confirm your new password',
      showToggle: true,
      toggleField: 'confirm'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400 text-white p-8 rounded-t-2xl text-center">
          <div className="flex items-center justify-center mb-4">
            <Lock className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold">Change Password</h2>
          <p className="text-blue-100 mt-2">Update your account security</p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mx-6 mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800">Password changed successfully!</span>
          </div>
        )}

        {/* Form */}
        <div className="p-6 space-y-6">
          {inputFields.map((field) => (
            <div key={field.id} className="space-y-2">
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  {field.icon}
                </div>
                
                <input
                  id={field.id}
                  type={field.type}
                  value={formData[field.id]}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                    errors[field.id] 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  disabled={isSubmitting}
                />
                
                {field.showToggle && (
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility(field.toggleField)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    disabled={isSubmitting}
                  >
                    {showPasswords[field.toggleField] ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>
              
              {errors[field.id] && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors[field.id]}</span>
                </div>
              )}
            </div>
          ))}

          {/* Submit Error */}
          {errors.submit && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-800">{errors.submit}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400 text-white py-3 px-4 rounded-lg font-medium transition-all transform hover:scale-105 hover:shadow-lg ${
              isSubmitting 
                ? 'opacity-70 cursor-not-allowed' 
                : 'hover:opacity-90'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Changing Password...</span>
              </div>
            ) : (
              'Change Password'
            )}
          </button>

          {/* Password Requirements */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• At least 8 characters long</li>
              <li>• Different from your current password</li>
              <li>• Must match confirmation password</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;