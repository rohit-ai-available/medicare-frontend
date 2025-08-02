import { useState } from 'react';
import axios from 'axios';
import { server_url } from '../config/url';
export default function EquipmentForm() {
  const [formData, setFormData] = useState({
    equipmentName: '',
    quantity: '',
    description: '',
    city: '',
    number:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    alert()
    console.log('Form submitted:', formData);
    // Handle form submission here
       let url = server_url+"/user/doAvailEquipment";
             
              let resp = await axios.post(url, formData, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
              }); 
              if(resp.data.status==true){
                alert(JSON.stringify(resp.data))
              }
              else{
                alert(JSON.stringify(resp.data))
              }
    alert('Equipment information submitted successfully!');
  };

  const handleReset = () => {
    setFormData({
      equipmentName: '',
      quantity: '',
      description: '',
      city: '',
      number:''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Equipment Information
        </h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="equipmentName" className="block text-sm font-medium text-gray-700 mb-2">
                Equipment Name
              </label>
              <input
                type="text"
                id="equipmentName"
                name="equipmentName"
                value={formData.equipmentName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80"
                placeholder="Enter equipment name"
                required
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80"
                placeholder="Enter quantity"
                min="1"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80 resize-none"
              placeholder="Enter equipment description"
              required
            />
          </div>
             <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80"
              placeholder="Enter city"
              required
            />
          </div>
            
             <div>
            <label htmlFor="Contact Number" className="block text-sm font-medium text-gray-700 mb-2">
              number
            </label>
            <input
              type="text"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80"
              placeholder="Enter city"
              required
            />
          </div>
           </div>
           </div>
          <div className="flex space-x-4 pt-4">
            <button
              type="submit" onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Submit
            </button>
            
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}