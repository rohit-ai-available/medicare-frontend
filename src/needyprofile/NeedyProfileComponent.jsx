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
    alert("The response will be here soon for your detail")
       let formData=new FormData()
      formData.append("imggg", e.target.files[0])
      let url = server_url+"/user/picreader";
          let resp = await axios.post(url,formData, {headers: {'Content-Type': 'multipart/form-data'  } });
          //alert(JSON.stringify(resp.data));
              if(resp.data){
                alert(JSON.stringify(resp.data))
               
              }
              else{
                alert(JSON.stringify(resp.data))
              }
               const mockAadhaarFrontData = {
    name: resp.data.name,
    dateOfBirth: resp.data.dob,
    gender: resp.data.gender,
    aadhaarNumber: resp.data.adhaar_number
  };
    const file = e.target.files[0];
    if (file) {
      setFrontFile(file);
      setProcessingFront(true);
      
      // Simulate OCR processing
      setTimeout(() => {
        setFrontInfo(mockAadhaarFrontData);
        setProcessingFront(false);
      }, 2000);
    }
  };

  const handleBackFileUpload = async(e) => {
   alert("The response will be here soon for your detail")
    let formData=new FormData()
      formData.append("imggg", e.target.files[0])
      let url = server_url+"/user/picreader";
          let resp = await axios.post(url,formData, {headers: {'Content-Type': 'multipart/form-data'  } });
          //alert(JSON.stringify(resp.data));
              if(resp.data){
             //   alert("yes")
                alert(JSON.stringify(resp.data))
               
              }
              else{
                alert(JSON.stringify(resp.data))
              }
                const mockAadhaarBackData = {
               address:resp.data.address,
                };
    const file = e.target.files[0];
    if (file) {
      setBackFile(file);
      setProcessingBack(true);
      
      // Simulate OCR processing
      setTimeout(() => {
        setBackInfo(mockAadhaarBackData);
        setProcessingBack(false);
      }, 2000);
    }
  };

  const handleSave = async() => {
    
  //   let obj={email:email,contactNumber:contactNumber,frontFile:frontFile,backFile:backFile}
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
           //alert(JSON.stringify(resp.data));
               if(resp.data.status==true){
                 alert(JSON.stringify(resp.data.msg))
                 let data=resp.data.status;
                 funref(data)
               }
               else{
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
           //alert(JSON.stringify(resp.data));
               if(resp.data.status==true){
                 alert(JSON.stringify(resp.data.msg))
                 let data=resp.data.status;
                 funref(data)
               }
               else{
                 alert(JSON.stringify(resp.data))
               }
    alert('Profile updated successfully!');
  };

  return (
    <div className='bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-200'>
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300
     rounded-lg shadow-lg " >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Needy Profile</h2>
        <p className="text-white/90">Complete your profile information</p>
      </div>

      <div className="space-y-6">
        {/* Email and Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-white/70" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter email address"
              className="w-full pl-10 pr-4 py-3 border border-white/30 bg-white/20 backdrop-blur-sm text-black
               placeholder-black rounded-lg focus:ring-2 focus:ring-white/50 focus:border-white/50 
               outline-none transition-all"
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-white/70" />
            <input
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Enter contact number"
              className="w-full pl-10 pr-4 py-3 border border-white/30 bg-white/20 backdrop-blur-sm text-black
               placeholder-black rounded-lg focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none transition-all"
            />
          </div>
        </div>

        <button
          onClick={handleFetch}
          disabled={loading}
          className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 disabled:bg-white/10
           text-black font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 border
            border-white/30"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Fetching...</span>
            </>
          ) : (
            <>
              <User className="h-5 w-5" />
              <span >Fetch Profile</span>
            </>
          )}
        </button>

        {error && (
          <div className="flex items-center space-x-2 text-red-100 bg-red-500/30 backdrop-blur-sm p-3 rounded-lg border
           border-red-300/50">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {profile && (
          <div className="p-4 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-4xl">{profile.avatar}</div>
              <div>
                <h3 className="font-semibold text-white">{profile.name}</h3>
                <p className="text-white/80 text-sm">{profile.email}</p>
                <p className="text-white/80 text-sm">{profile.contact}</p>
              </div>
            </div>
            <p className="text-white/90">{profile.bio}</p>
          </div>
        )}

        {/* Aadhaar Card Upload Section */}
        <div className="border-t border-white/30 pt-6">
          <h3 className="text-lg font-semibold text-black mb-4">Aadhaar Card Verification</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Front Side Upload */}
            <div className="space-y-4">
              <h4 className="font-medium text-black">Front Side of Aadhaar</h4>
              <div className="border-2 border-dashed border-white/40 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:border-white/60 hover:bg-white/20 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFrontFileUpload}
                  className="hidden"
                  id="front-upload"
                />
                <label htmlFor="front-upload" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-white/70 mb-2" />
                  <p className="text-sm text-white/80">Click to upload front side</p>
                  <p className="text-xs text-white/60">PNG, JPG up to 5MB</p>
                </label>
              </div>
              
              {frontFile && (
                <div className="text-sm text-green-200 bg-green-500/30 backdrop-blur-sm p-2 rounded border border-green-300/50 flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Front side uploaded: {frontFile.name}</span>
                </div>
              )}

              {processingFront && (
                <div className="flex items-center space-x-2 text-blue-200 bg-blue-500/30 backdrop-blur-sm p-2 rounded border border-blue-300/50">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Processing front side...</span>
                </div>
              )}

              {frontInfo && (
                <div className="bg-blue-500/30 backdrop-blur-sm p-3 rounded-lg border border-blue-300/50">
                  <h5 className="font-medium text-blue-100 mb-2">Extracted Information:</h5>
                  <div className="space-y-1 text-sm text-white/90">
                    <p><strong>Name:</strong> {frontInfo.name}</p>
                    <p><strong>Date of Birth:</strong> {frontInfo.dateOfBirth}</p>
                    <p><strong>Gender:</strong> {frontInfo.gender}</p>
                    <p><strong>Aadhaar Number:</strong> {frontInfo.aadhaarNumber}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Back Side Upload */}
            <div className="space-y-4">
              <h4 className="font-medium text-black">Back Side of Aadhaar</h4>
              <div className="border-2 border-dashed border-white/40 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:border-white/60 hover:bg-white/20 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBackFileUpload}
                  className="hidden"
                  id="back-upload"
                />
                <label htmlFor="back-upload" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-white/70 mb-2" />
                  <p className="text-sm text-white/80">Click to upload back side</p>
                  <p className="text-xs text-white/60">PNG, JPG up to 5MB</p>
                </label>
              </div>
              
              {backFile && (
                <div className="text-sm text-green-200 bg-green-500/30 backdrop-blur-sm p-2 rounded border border-green-300/50 flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Back side uploaded: {backFile.name}</span>
                </div>
              )}

              {processingBack && (
                <div className="flex items-center space-x-2 text-blue-200 bg-blue-500/30 backdrop-blur-sm p-2 rounded border border-blue-300/50">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Processing back side...</span>
                </div>
              )}

              {backInfo && (
                <div className="bg-green-500/30 backdrop-blur-sm p-3 rounded-lg border border-green-300/50">
                  <h5 className="font-medium text-green-100 mb-2">Address Information:</h5>
                  <div className="space-y-1 text-sm text-white/90">
                    <p><strong>Address:</strong> {backInfo.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-6 border-t border-white/30">
          <button
            onClick={handleSave}
            className="flex-1 bg-green-500/30 backdrop-blur-sm hover:bg-green-500/50 text-black font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 border border-green-300/50"
          >
            <Save className="h-5 w-5" />
            <span>Save Profile</span>
          </button>
          
          <button
            onClick={handleUpdate}
            className="flex-1 bg-orange-500/30 backdrop-blur-sm hover:bg-orange-500/50 text-black font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 border border-orange-300/50"
          >
            <Edit className="h-5 w-5" />
            <span>Update Profile</span>
          </button>
        </div>

        {/* Sample Data Helper */}
        {hasAttempted && !profile && !loading && !error && (
          <div className="text-center text-white/80 py-4">
            <p>Try one of these sample emails:</p>
            <div className="mt-2 space-y-1 text-sm">
              <button
                onClick={() => setEmail('john@example.com')}
                className="block w-full text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 rounded transition-colors"
              >
                john@example.com
              </button>
              <button
                onClick={() => setEmail('jane@example.com')}
                className="block w-full text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 rounded transition-colors"
              >
                jane@example.com
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}