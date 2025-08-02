import React, { useState, useEffect } from 'react';
import { Search, MapPin,Building2,Layers,Info, Package, Calendar, User, Phone, Mail } from 'lucide-react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { server_url } from '../config/url';
const MediFinder = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [loading, setLoading] = useState(false);
   const [jsonary,setjsonary] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState(true);

  const navigate=useNavigate()
     /// automaticallly filled cities in the combo box
       useEffect(()=>{
             async function fetchdata() {
             // alert()
               setCitiesLoading(true);
                let url = server_url+"/user/medifinder";
                       let resp = await axios.post(url, {
                         headers: { "Content-Type": "application/x-www-form-urlencoded" },
                       });
              //alert(JSON.stringify(resp.data));
                   if(resp){
                    setCities(resp.data)
                     //alert(city)
                     
                   }
                   else{
                     alert(JSON.stringify(resp.data))
                   }  
                    setCitiesLoading(false);
             }
             fetchdata();
         },[])
  // Function to search medicines
  const searchMedicines = async (city, medicine) => {
           if(city=='' || medicine==''){
            return -1;
           }
           setLoading(true)
  };
  // Handle fetch button click
  const handleFetch = async() => {
    if (!selectedCity && !medicineName) {
      alert('Please select a city or enter a medicine name');
      return;
    }
  let ans=await searchMedicines(selectedCity, medicineName);
        if(ans==-1){
            alert("choose city or medicine name ")
            return;
        }
     // alert(selectedCity+"  "+medicineName)
      let formdata=new FormData()
         formdata.append("city",selectedCity)
         formdata.append("medicine",medicineName)
      let url = server_url+"/user/fetchFinderData";
         let resp = await axios.post(url,formdata, {
                   headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    });
                // alert(JSON.stringify(resp.data))
                  setLoading(false)
              let filterdata;
                  if(resp){
              ///  filterdata=resp.data.map((item)=>item)
                   setjsonary(resp.data)
              }
  };
  async function getcontact(email){
   // alert(email)
    let url = server_url+"/user/getcontact";
         let resp = await axios.post(url,{'email':email}, {
                   headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    });
                    if(resp.data.status==true){
                     // alert(JSON.stringify(resp.data.obj.contactNumber))
                       navigate('/needy-navbar/contact-page')
                       localStorage.setItem('contact',resp.data.obj.contactNumber)
                    }
                    else{
                      alert(JSON.stringify(resp.data))
                    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-200 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Medicine Search</h1>
          <p className="text-white text-lg opacity-90">Find available medicines in your city</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Column 1: City Combo Box */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <MapPin size={16} />
                Select City
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={citiesLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">
                  {citiesLoading ? 'Loading cities...' : 'Choose a city...'}
                </option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {citiesLoading && (
                <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>
                  Loading cities...
                </div>
              )}
            </div>

            {/* Column 2: Medicine Name Text Box */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Package size={16} />
                Medicine Name
              </label>
              <input
                type="text"
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                placeholder="Enter medicine name..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Fetch Button */}
          <div className="text-center">
            <button
              onClick={handleFetch}
              disabled={loading}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-8 rounded-lg hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto min-w-[150px]"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search size={20} />
                  Fetch Results
                </>
              )}
            </button>
          </div>
        </div>

        {/* Search Results */}
        {jsonary.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Found {jsonary.length} Medicine(s)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jsonary.map((medicine) => (
                <div
                  key={medicine._id}
                  className="bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400 rounded-lg shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Medicine: {medicine.medicine}</h3>
                    <Package className="text-white opacity-80" size={24} />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <span className="text-sm">Email: {medicine.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 size={16} />
                      <span className="text-sm">Company: {medicine.company}</span>
                    </div>
                     
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span className="text-sm">City: {medicine.city}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span className="text-sm">Expires: {medicine.expiryDate}</span>
                    </div>
                     <div className="flex items-center gap-2">
                      <Package size={16} />
                      <span className="text-sm">Packing: {medicine.packing}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Layers size={16} />
                      <span className="text-sm">Quantity: {medicine.quantity}</span>
                    </div>
                        <div className="flex items-center gap-2">
                      <Info size={16} />
                      <span className="text-sm">Other Information: {medicine.otherInfo}</span>
                    </div>
        
                    <div className="flex gap-2 pt-2">
                      <a
                    
                        onClick={()=>getcontact(medicine.email)} 
                        className="flex-1 bg-white bg-opacity-20 hover:bg-opacity-30 text-black py-2 px-3 rounded-md text-sm font-medium text-center transition-colors duration-200 flex items-center justify-center gap-1"
                      >
                        <Phone size={14} />
                        Call
                      </a>
              
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {!loading && jsonary.length === 0 && (selectedCity || medicineName) && (
          <div className="text-center py-12">
            <Package className="mx-auto text-white opacity-60 mb-4" size={48} />
            <h3 className="text-xl font-medium text-white mb-2">No medicines found</h3>
            <p className="text-white opacity-80">
              Try different search criteria or check back later for new donations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediFinder;