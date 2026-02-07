import { useState, useRef, useEffect } from 'react';
import { Shield, Loader, RotateCcw } from 'lucide-react';
import { server_url } from '../config/url';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function OTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const inputRefs = useRef([]);
  const navigate = useNavigate();
        var emailid=localStorage.getItem("emailid")
      //  alert(emailid)
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');

    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
      
    setLoading(true);
   //alert(otp)
    setError('');
    setMessage('');

  
      await new Promise(resolve => setTimeout(resolve, 1500));
        let url = server_url+"/user/doverify";
         let resp = await axios.post(url,{email:emailid,otp:otp.join("")}, {
                   headers: { "Content-Type": "application/x-www-form-urlencoded" },
              }); 
                setLoading(false)
               // alert(JSON.stringify(resp.data))
               if(resp.data){
                alert(resp.data.message)
                if(resp.data.obj.userType=="doner"){
                navigate('/donor-navbar')
                 localStorage.setItem('logintoken',resp.data.token)
               localStorage.setItem('email',resp.data.obj.email)
                }
            else{
                localStorage.setItem('logintoken',resp.data.token)
             localStorage.setItem('email',resp.data.obj.email)
                navigate('/needy-navbar')
            }
               }
                  setOtp(['', '', '', '', '', '']);
  };

  const handleResend = () => {
    setError('');
    setMessage('');
    setOtp(['', '', '', '', '', '']);
    setMessage('OTP resent to your email');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <Shield className="w-12 h-12 text-indigo-600" />
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Verify Your Identity
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter the 6-digit code sent to your email
        </p>

        <div className="space-y-4">
          <div className="flex gap-3 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                maxLength="1"
                className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              />
            ))}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg text-sm">
              {message}
            </div>
          )}

          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify OTP'
            )}
          </button>

          <div className="text-center">
            <button
              onClick={handleResend}
              className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center justify-center gap-2 mx-auto"
            >
              <RotateCcw className="w-4 h-4" />
              Resend Code
            </button>
          </div>
        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          Didn't receive the code? Check your spam folder or contact support.
        </p>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-700">
            <strong>Demo:</strong> Enter <strong>123456</strong> to verify
          </p>
        </div>
      </div>
    </div>
  );
}