import { useState } from 'react';
import { Mail, Loader } from 'lucide-react';
import axios from "axios"
import { server_url } from '../config/url';
import { useNavigate } from 'react-router-dom';
export default function EmailLogin() {
     const navigate=useNavigate()
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    setMessage('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
  //  alert()
    try {
         
          let url = server_url+"/user/getotp";
         let resp = await axios.post(url,{email:email}, {
                   headers: { "Content-Type": "application/x-www-form-urlencoded" },
              });
              localStorage.setItem("emailid",email)
                await new Promise(resolve => setTimeout(resolve, 1500));
                if(resp.data.success){
                navigate('/login/verify')
                }
                 alert(JSON.stringify(resp.data.error))
    //   await new Promise(resolve => setTimeout(resolve, 1500));
      setMessage(`Login link sent to ${email}`);
      setEmail('');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <Mail className="w-12 h-12 text-indigo-600" />
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your email to sign in
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            />
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
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Sign In with Email'
            )}
          </button>
        </div>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?{' '}
          <button className="text-indigo-600 hover:text-indigo-700 font-semibold">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}