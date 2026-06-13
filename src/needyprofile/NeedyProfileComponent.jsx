import React, { useState } from 'react';
import axios from 'axios'
import { Mail, User, Loader2, AlertCircle, Phone, Upload, FileText, Save, Edit, CheckCircle } from 'lucide-react';
import { server_url } from '../config/url';

export default function NeedyProfileComponent() {
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasAttempted, setHasAttempted] = useState(false);
  
  // Aadhaar related states
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [frontInfo, setFrontInfo] = useState(null);
  const [backInfo, setBackInfo] = useState(null);
  const [processingFront, setProcessingFront] = useState(false);
  const [processingBack, setProcessingBack] = useState(false);

  // Preview States
  const [frontPreview, setFrontPreview] = useState(null);
  const [backPreview, setBackPreview] = useState(null);

  const mockProfiles = {
    'john@example.com': {
      name: 'John Doe',
      email: 'john@example.com',
      contact: '+91 98765 43210',
      avatar: '👨‍💼',
      bio: 'Software Developer passionate about creating amazing user experiences',
      location: 'San Francisco, CA',
      joinedDate: '2023-01-15',
      followers: 1250,
      following: 890
    },
    'jane@example.com': {
      name: 'Jane Smith',
      email: 'jane@example.com',
      contact: '+91 87654 32109',
      avatar: '👩‍🎨',
      bio: 'UX Designer & Creative Director. Love crafting beautiful digital experiences',
      location: 'New York, NY',
      joinedDate: '2022-08-20',
      followers: 2100,
      following: 650
    }
  };

  const handleFetch = async () => {
    if (!email) {
      setError('Please enter an email address');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setLoading(true);
    setError('');
    setHasAttempted(true);
    setTimeout(() => {
      const foundProfile = mockProfiles[email.toLowerCase()];
      if (foundProfile) {
        setProfile(foundProfile);
        setContactNumber(foundProfile.contact);
        setError('');
      } else {
        setProfile(null);
        setError('Profile not found for this email address');
      }
      setLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFetch();
    }
  };

  const handleFrontFileUpload = async(e) => { 
    const file = e.target.files[0];
    if (!file) return;

    // Show Preview immediately
    setFrontPreview(URL.createObjectURL(file));
    setFrontFile(file);
    setProcessingFront(true);

    alert("The response will be here soon for your detail")
    let formData = new FormData()
    formData.append("imggg", file)
    let url = server_url + "/user/picreader";
    
    try { 
      alert("111")
      let resp = await axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      if(resp.data) {
        alert(JSON.stringify(resp.data))
        const mockAadhaarFrontData = {
          name: resp.data.name,
          dateOfBirth: resp.data.dob,
          gender: resp.data.gender,
          aadhaarNumber: resp.data.adhaar_number
        };
        setFrontInfo(mockAadhaarFrontData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingFront(false);
    }
  };

  const handleBackFileUpload = async(e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show Preview immediately
    setBackPreview(URL.createObjectURL(file));
    setBackFile(file);
    setProcessingBack(true);

    alert("The response will be here soon for your detail")
    let formData = new FormData()
    formData.append("imggg", file)
    let url = server_url + "/user/picreader";
    
    try {
      let resp = await axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      if(resp.data) {
        alert(JSON.stringify(resp.data))
        const mockAadhaarBackData = {
          address: resp.data.address,
        };
        setBackInfo(mockAadhaarBackData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingBack(false);
    }
  };

  const handleSave = async() => {
    let formData=new FormData();
    formData.append("email",email)
    formData.append("contactNumber",contactNumber)
    formData.append("frontFile",frontFile)
    formData.append("backFile",backFile)
    alert("yes")
    let url = server_url+"/user/needyrForm";
    let resp = await axios.post(url, formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    if(resp.data.status==true){
      alert(JSON.stringify(resp.data.msg))
    } else {
      alert(JSON.stringify(resp.data))
    }
    alert('Profile saved successfully!');
  };

  const handleUpdate = async() => {
    let formData=new FormData();
    formData.append("email",email)
    formData.append("contactNumber",contactNumber)
    formData.append("frontFile",frontFile)
    formData.append("backFile",backFile)
    alert("yes")
    let url = server_url+"/user/needyupdate";
    let resp = await axios.post(url, formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    if(resp.data.status==true){
      alert(JSON.stringify(resp.data.msg))
    } else {
      alert(JSON.stringify(resp.data))
    }
    alert('Profile updated successfully!');
  };

  return (
    <div className='bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-200 min-h-screen py-10'>
      <div className="max-w-2xl mx-auto p-6 shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold  mb-2">Needy Profile</h2>
          <p className="text-white/90">Complete your profile information</p>
        </div>

        <div className="space-y-6">
          {/* Email and Contact Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-white/70" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyPress={handleKeyPress} placeholder="Enter email address" className="w-full pl-10 pr-4 py-3 border border-white/30 bg-white/20 backdrop-blur-sm text-black placeholder-black rounded-lg focus:ring-2 focus:ring-white/50 outline-none transition-all" />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-white/70" />
              <input type="tel" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} placeholder="Enter contact number" className="w-full pl-10 pr-4 py-3 border border-white/30 bg-white/20 backdrop-blur-sm text-black placeholder-black rounded-lg focus:ring-2 focus:ring-white/50 outline-none transition-all" />
            </div>
          </div>

          <button onClick={handleFetch} disabled={loading} className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 disabled:bg-white/10 text-black font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 border ">
            {loading ? <><Loader2 className="h-5 w-5 animate-spin" /><span>Fetching...</span></> : <><User className="h-5 w-5" /><span>Fetch Profile</span></>}
          </button>

          {/* Aadhaar Card Section */}
          <div className="border-t border-white/30 pt-6">
            <h3 className="text-lg font-semibold text-black mb-4">Aadhaar Card Verification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Front Side */}
              <div className="space-y-4">
                <h4 className="font-medium text-black">Front Side</h4>
                <div className="relative border-2 border-dashed border-white/40 bg-white/10 rounded-lg h-40 flex flex-col items-center justify-center overflow-hidden">
                  {frontPreview ? (
                    <img src={frontPreview} alt="Front" className="w-full h-full object-cover" />
                  ) : (
                    <label htmlFor="front-upload" className="cursor-pointer text-center p-4">
                      <Upload className="mx-auto h-10 w-10 text-white/70 mb-2" />
                      <p className="text-xs text-white">Upload Front</p>
                    </label>
                  )}
                  <input type="file" accept="image/*" onChange={handleFrontFileUpload} className="hidden" id="front-upload" />
                  
                  {processingFront && (
                    <div className="absolute inset-0 bg-indigo-600/60 backdrop-blur-sm flex flex-col items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-white mb-2" />
                      <span className="text-white text-xs font-bold uppercase tracking-widest">Scanning...</span>
                    </div>
                  )}
                </div>
                {frontInfo && (
                  <div className="bg-blue-500/30 backdrop-blur-sm p-3 rounded-lg border border-blue-300/50 text-xs text-white">
                    <p><strong>Name:</strong> {frontInfo.name}</p>
                    <p><strong>DOB:</strong> {frontInfo.dateOfBirth}</p>
                    <p><strong>Gender:</strong> {frontInfo.gender}</p>
                    <p><strong>Aadhaar:</strong> [Aadhaar Redacted]</p>
                  </div>
                )}
              </div>

              {/* Back Side */}
              <div className="space-y-4">
                <h4 className="font-medium text-black">Back Side</h4>
                <div className="relative border-2 border-dashed border-white/40 bg-white/10 rounded-lg h-40 flex flex-col items-center justify-center overflow-hidden">
                  {backPreview ? (
                    <img src={backPreview} alt="Back" className="w-full h-full object-cover" />
                  ) : (
                    <label htmlFor="back-upload" className="cursor-pointer text-center p-4">
                      <Upload className="mx-auto h-10 w-10 text-white/70 mb-2" />
                      <p className="text-xs text-white">Upload Back</p>
                    </label>
                  )}
                  <input type="file" accept="image/*" onChange={handleBackFileUpload} className="hidden" id="back-upload" />

                  {processingBack && (
                    <div className="absolute inset-0 bg-purple-600/60 backdrop-blur-sm flex flex-col items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-white mb-2" />
                      <span className="text-white text-xs font-bold uppercase tracking-widest">Scanning...</span>
                    </div>
                  )}
                </div>
                {backInfo && (
                  <div className="bg-green-500/30 backdrop-blur-sm p-3 rounded-lg border border-green-300/50 text-xs text-white">
                    <p><strong>Address:</strong> {backInfo.address}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-6">
            <button onClick={handleSave} className="flex-1 bg-green-500/40 hover:bg-green-500/60 text-black font-semibold py-3 rounded-lg border border-green-300 transition-all flex items-center justify-center space-x-2">
              <Save className="h-5 w-5" /><span>Save Profile</span>
            </button>
            <button onClick={handleUpdate} className="flex-1 bg-orange-500/40 hover:bg-orange-500/60 text-black font-semibold py-3 rounded-lg border border-orange-300 transition-all flex items-center justify-center space-x-2">
              <Edit className="h-5 w-5" /><span>Update Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}