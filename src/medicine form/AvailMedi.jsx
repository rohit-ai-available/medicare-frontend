import React, { useState } from 'react';
import axios from 'axios';
import { Calendar, Package, Mail, Building, Clock, Info, Plus } from 'lucide-react';
import { server_url } from '../config/url';

const MedicineDonationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    medicine: '',
    company: '',
    expiryDate: '',
    packing: '',
    quantity: '',
    otherInformation: ''
  });

  const [errors, setErrors] = useState({});
  const [submissions, setSubmissions] = useState([]);

  const packingOptions = [
    'Tablet',
    'Bottle',
    'Tube',
    'Injection',
    'Capsule Strip',
    'Sachet',
    'Dropper Bottle',
    'Ampoule',
    'Spray',
    'Powder'
  ];

  const handleInputChange = (e) => {
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.medicine) {
      newErrors.medicine = 'Medicine name is required';
    }
    
    if (!formData.company) {
      newErrors.company = 'Company name is required';
    }
    
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else {
      const expiryDate = new Date(formData.expiryDate);
      const today = new Date();
      if (expiryDate <= today) {
        newErrors.expiryDate = 'Medicine must not be expired';
      }
    }
    
    if (!formData.packing) {
      newErrors.packing = 'Packing type is required';
    }
    
    if (!formData.quantity) {
      newErrors.quantity = 'Quantity is required';
    } else if (isNaN(formData.quantity) || parseInt(formData.quantity) <= 0) {
      newErrors.quantity = 'Please enter a valid quantity';
    }
    
    return newErrors;
  };

  const handleSubmit = async() => {
    const newErrors = validateForm();
    alert(formData)
    if (Object.keys(newErrors).length === 0) {
      // Add to submissions list
      setSubmissions(prev => [...prev, { ...formData, id: Date.now() }]);
      
      
         let url = server_url+"/user/availmedi";
             
              let resp = await axios.post(url, formData, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
              });
      //alert(JSON.stringify(resp.data));
          if(resp.data.status==true){
            alert(JSON.stringify(resp.data.msg))
          }
          else{
            alert(JSON.stringify(resp.data))
          }


      // Reset form
      setFormData({
        email: '',
        medicine: '',
        company: '',
        expiryDate: '',
        packing: '',
        quantity: '',
        otherInformation: ''
      });
      
      alert('Medicine donation registered successfully!');
    } else {
      setErrors(newErrors);
    }
  };
  ///// update function
  async function handleUpdate(){
    alert()
     
         let url = server_url+"/user/availmediupdate";
             
              let resp = await axios.post(url, formData, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
              });
      //alert(JSON.stringify(resp.data));
          if(resp.data.status==true){
            alert(JSON.stringify(resp.data.msg))
          }
          else{
            alert(JSON.stringify(resp.data))
          }
  }
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Medicine Donation Form</h1>
          <p className="text-gray-600">Help save lives by donating unused medicines</p>
        </div>

        <div className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 mr-2 text-blue-500" />
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Medicine Name */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Package className="w-4 h-4 mr-2 text-green-500" />
              Medicine Name *
            </label>
            <input
              type="text"
              name="medicine"
              value={formData.medicine}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.medicine ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter medicine name"
            />
            {errors.medicine && <p className="mt-1 text-sm text-red-600">{errors.medicine}</p>}
          </div>

          {/* Company Name */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Building className="w-4 h-4 mr-2 text-purple-500" />
              Company Name *
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.company ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter pharmaceutical company name"
            />
            {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
          </div>

          {/* Expiry Date */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 mr-2 text-red-500" />
              Expiry Date *
            </label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              min={getTomorrowDate()}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.expiryDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
          </div>

          {/* Packing Type */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Package className="w-4 h-4 mr-2 text-orange-500" />
              Packing Type *
            </label>
            <select
              name="packing"
              value={formData.packing}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.packing ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select packing type</option>
              {packingOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.packing && <p className="mt-1 text-sm text-red-600">{errors.packing}</p>}
          </div>

          {/* Quantity */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Plus className="w-4 h-4 mr-2 text-indigo-500" />
              Quantity *
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              min="1"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.quantity ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter quantity"
            />
            {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
          </div>

          {/* Other Information */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Info className="w-4 h-4 mr-2 text-gray-500" />
              Other Information
            </label>
            <textarea
              name="otherInformation"
              value={formData.otherInformation}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Any additional information about the medicine (storage conditions, batch number, etc.)"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
            >
              Register Medicine Donation
            </button>
          </div>
            <div className="pt-4">
            <button
              onClick={handleUpdate}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
            >
              Update your medicine details
            </button>
          </div>
        </div>
      </div>

      {/* Submissions List */}
      {submissions.length > 0 && (
        <div className="bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Donations</h2>
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div key={submission.id} className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div><strong>Email:</strong> {submission.email}</div>
                  <div><strong>Medicine:</strong> {submission.medicine}</div>
                  <div><strong>Company:</strong> {submission.company}</div>
                  <div><strong>Expiry:</strong> {submission.expiryDate}</div>
                  <div><strong>Packing:</strong> {submission.packing}</div>
                  <div><strong>Quantity:</strong> {submission.quantity}</div>
                  {submission.otherInformation && (
                    <div className="md:col-span-2"><strong>Notes:</strong> {submission.otherInformation}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineDonationForm;