import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom'; // Added useSearchParams
import { server_url } from '../config/url';

const LoginForm = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); // Hook to listen to '?verified=true'
  const [showVerifiedBanner, setShowVerifiedBanner] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Listen for redirection confirmation token parameter on mount
  useEffect(() => {
    if (searchParams.get('verified') === 'true') {
      setShowVerifiedBanner(true);
      
      // Clean up the URL query params parameter cleanly so it resets gracefully on refresh
      searchParams.delete('verified');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // 1. Initialize Google Sign-In on mount
  useEffect(() => {
    /* global google */
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "442871528221-u6i1i9em83n34mvtko19j1drtk1bus7k.apps.googleusercontent.com", // Replace with your real Client ID
        callback: handleGoogleLogin,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large", width: "100%" } // width expanded to fit your layout nicely
      );
    }
  }, []);

  // 2. Handle Google Login Callback
  const handleGoogleLogin = async (response) => {
    try {
      setIsLoading(true);
      console.log("Google Token:", response.credential);

      // Using your existing axios pattern. Adjust the endpoint path to match your actual backend configuration
      let url = server_url+"/user/google-login"; 
      
      let resp = await axios.post(url, { credential: response.credential }, {
        headers: { "Content-Type": "application/json" },
      });
         //alert(JSON.stringify(resp.data))
      if (resp.data.status === true || resp.data.token) {
        let logintoken = resp.data.token;
        localStorage.setItem('logintoken', logintoken);
        
        // Handle post-login redirection based on your existing logic
        if (resp.data.obj?.userType === "needy") {
          localStorage.setItem('email', resp.data.obj.email || '');
          navigate('/needy-navbar');
        } else {
          localStorage.setItem('email', resp.data.obj?.email || '');
          navigate('/donor-navbar');
        }
      } else {
        alert(JSON.stringify(resp.data));
      }
    } catch (error) {
      console.error("Google Auth Error:", error);
      alert("Google Sign-In failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
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
    setIsLoading(true);
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
       
    let url = server_url + "/user/login";
         
    try {
      let resp = await axios.post(url, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }); 
      
      let logintoken = resp.data.token;
     
      if (resp.data.status === true) {
        alert(JSON.stringify(resp.data.msg));
        if (resp.data.obj.userType === "needy") {
          localStorage.setItem('logintoken', logintoken);
          localStorage.setItem('email', formData.email);
          navigate('/needy-navbar');
        } else {
          localStorage.setItem('logintoken', logintoken);
          localStorage.setItem('email', formData.email);
          navigate('/donor-navbar');
        }
      } else {
        alert(JSON.stringify(resp.data));
      }
    } catch (err) {
      console.error(err);
    }

    setTimeout(() => {
      setIsLoading(false);
      setFormData({
        email: '',
        password: '',
        rememberMe: false
      });
    }, 150);
  };

  const handleForgotPassword = () => {
     navigate('/login/forgot');
  };
  function dosignup(){
    navigate("/signup")
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20 animate-fade-in">
        
        {/* Verification Success Alert Banner */}
        {showVerifiedBanner && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-center text-sm font-semibold rounded-xl animate-bounce shadow-sm">
            💚 Account activated successfully! You can now log in.
          </div>
        )}

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

          {/* Visual Divider between Regular login and Google login */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google Sign-In Target Button */}
          <div className="flex justify-center w-full">
            <div id="googleSignInDiv" className="w-full"></div>
          </div>

        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={dosignup}
              className="text-purple-500 hover:text-purple-600 font-semibold transition-colors duration-200"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;