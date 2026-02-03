import React, { useState } from 'react';
import axios from "axios";
import { User, Mail, Calendar, Pill, Search, Phone, MapPin, GraduationCap, Briefcase, Upload, Camera, FileText, Save, Edit } from 'lucide-react';
import { server_url } from '../config/url';

export default function DonorMedicineForm({refAvailMedi}) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    currentAddress: '',
    contactNumber: '',
    qualification: '',
    occupation: '',
    aadhaarCard: null,
    profilePic: null
  });
  
  const [fetchedData, setFetchedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
   const [loading, setLoading] = useState(false);
  const [aadhaarPreview, setAadhaarPreview] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: file
      })); 
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (fieldName === 'aadhaarCard') {
          setAadhaarPreview(e.target.result);
        } else if (fieldName === 'profilePic') {
          setProfilePreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMedicineChange = (index, field, value) => {
    // Function no longer needed - can be removed
  };

  const addMedicine = () => {
    // Function no longer needed - can be removed
  };

  const removeMedicine = (index) => {
    // Function no longer needed - can be removed
  };

  const handleFetchEmail = async () => {
    setIsLoading(true);
    alert()
    
        let url = server_url+"/user/find";
                 
                 let resp = await axios.post(url,formData, {headers: {'Content-Type': 'application/x-www-form-urlencoded'  } });
              if(resp){
               alert(JSON.stringify(resp.data));
              }
              else{
                alert(resp.data)
              }
    // Simulate API call to fetch user data by email
    setTimeout(() => {
      const mockData = {
        name: resp.data[0].name,
        age: resp.data[0].age,
        gender: resp.data[0].gender,
        email: formData.email,
        currentAddress: resp.data[0].currentAddress,
        contactNumber: resp.data[0].contactNumber,
        qualification: resp.data[0].qualification,
        occupation: resp.data[0].occupation,
        aadhaarCard: resp.data[0].aadhaarCard,
        profilePic: resp.data[0].profilePic,
      };
      setFetchedData(mockData);
      setProfilePreview(resp.data[0].profilePic)
      setAadhaarPreview(resp.data[0].aadhaarCard)
      setFormData(prev => ({
        ...prev,
        ...mockData
      }));
      setIsLoading(false);
    }, 1000);
  };

  const handleSave = async() => {
    if(aadhaarPreview==null && profilePreview==null){
      alert("upload your adhaarCard and Profile pic")
      return;
    }
      
    setLoading(true)

   // alert(JSON.stringify(formData))
      let fd=new FormData();
  for(let prop in formData)
  {
      fd.append(prop,formData[prop]);
  }
        let url = server_url+"/user/doner";
                 
                 let resp = await axios.post(url, fd, {headers: {'Content-Type': 'multipart/form-data'  } });
          // alert(JSON.stringify(resp.data));
              if(resp.data.status==true){
                alert(JSON.stringify(resp.data.msg))
                let data=resp.data.status;
                refAvailMedi(data)
              }
              else{
                   alert(JSON.stringify(resp.data));
                   setLoading(false)
                   return;
              }

    console.log('Form saved:', formData);
    setLoading(false)
    alert('Medicine donation form saved successfully!');
  };

  const handleUpdate = async() => {
    alert(JSON.stringify(formData))
          let fd=new FormData();
  for(let prop in formData)
  {
      fd.append(prop,formData[prop]);
  }
        let url = server_url+"/user/donerupdate";
                 
                 let resp = await axios.post(url, fd, {headers: {'Content-Type': 'multipart/form-data'  } });
          //alert(JSON.stringify(resp.data));
              if(resp.data.status==true){
                alert(JSON.stringify(resp.data.msg))
                let data=resp.data.status;
                funref(data)
              }
              else{
                alert(JSON.stringify(resp.data))
              }
    alert('Medicine donation form updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400  ">
      <div className="max-w-4xl mx-auto ">
        <div className="bg-white rounded-xl shadow-lg p-8 ">
          <div className="text-center mb-8 ">
            <div className="flex items-center justify-center mb-4 ">
              <Pill className="text-blue-600 w-8 h-8 mr-2" />
              <h1 className="text-3xl font-bold text-gray-800">Medicine Donor Registration</h1>
            </div>
            <p className="text-gray-600">Complete your profile to donate medicines and help save lives</p>
          </div>

          <div className="space-y-6">
            {/* Email with Fetch Button */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Mail className="w-4 h-4 mr-2" />
                Email Address
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={handleFetchEmail}
                  disabled={!formData.email || isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  Fetch
                </button>
              </div>
              {fetchedData && (
                <p className="text-sm text-green-600">✓ User data fetched successfully</p>
              )}
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <User className="w-4 h-4 mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Age */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Enter your age"
                  min="18"
                  max="120"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <User className="w-4 h-4 mr-2" />
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Contact Number */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your contact number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Current City */}

              {/* Qualification */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Qualification
                </label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  placeholder="Enter your qualification"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Occupation */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Occupation
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  placeholder="Enter your occupation"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Current Address */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <MapPin className="w-4 h-4 mr-2" />
                Current Address
              </label>
              <textarea
                name="currentAddress"
                value={formData.currentAddress}
                onChange={handleInputChange}
                placeholder="Enter your complete current address"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Aadhaar Card Upload */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Aadhaar Card
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => handleFileChange(e, 'aadhaarCard')}
                    className="hidden"
                    id="aadhaar-upload"
                  />
                  <label htmlFor="aadhaar-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Click to upload Aadhaar card</p>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG up to 5MB</p>
                  </label>
                  {aadhaarPreview && (
                    <div className="mt-2">
                      <img src={aadhaarPreview} alt="Aadhaar preview" className="max-w-full h-20 object-cover rounded mx-auto" />
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Picture Upload */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Camera className="w-4 h-4 mr-2" />
                  Profile Picture
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'profilePic')}
                    className="hidden"
                    id="profile-upload"
                  />
                  <label htmlFor="profile-upload" className="cursor-pointer">
                    <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Click to upload profile picture</p>
                    <p className="text-xs text-gray-500">JPG, PNG up to 2MB</p>
                  </label>
                  {profilePreview && (
                    <div className="mt-2">
                      <img src={profilePreview} alt="Profile preview" className="max-w-full h-20 object-cover rounded-full mx-auto" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={handleSave}
                  disabled={loading}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
              >
         {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                         saving...
                        </>
                      ) : (
                        <>
                    <Save className="w-5 h-5" />
                     Save Form
                        </>
                      )}        
             
              </button>
              <button
                type="button"
                onClick={handleUpdate}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
              >
                <Edit className="w-5 h-5" />
                Update Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}