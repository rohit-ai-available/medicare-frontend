import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, CheckSquare, Lock, LogOut } from 'lucide-react';
import { useEffect } from 'react';

const DonorMedicineDashboard = () => {
  const navigate=useNavigate()
  useEffect(()=>{
    let token=localStorage.getItem('logintoken')
    if(!token){
      navigate('/')
    }
  })
  
  let email=localStorage.getItem('email')
  const handleDonorDetails = () => {
    console.log('Navigate to Donor Details');
    navigate('doner-detail')
    // You can replace this with your navigation logic
  };

  const handleMedicineAvailable = () => {
    console.log('Navigate to Medicine Available');
     navigate('medicine-available')
    // You can replace this with your navigation logic
  };
  
    const handleAvailEquipment = () => {
    console.log('Navigate to Avail Equipments');
     navigate('avail-equipment')
    // You can replace this with your navigation logic
  };

  const handleTodoList = () => {
    console.log('Navigate to Todo List');
     navigate('todolist')
    // You can replace this with your navigation logic
  };

  const handleChangePassword = () => {
    console.log('Navigate to Change Password');
    navigate('change-password')
    // You can replace this with your navigation logic
  };

  const handleLogout = () => {
    console.log('Logging out...');
    alert('Logging out...');
    localStorage.removeItem('logintoken')
    navigate("/")
    // You can replace this with your logout logic
  };

  const cards = [
    {
      id: 'donor-details',
      title: 'Donor Details',
      icon: <User className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400',
      buttonText: 'View Donor Details',
      onClick: handleDonorDetails
    },
    {
      id: 'medicine-available',
      title: 'Medicine Available',
      icon: <Package className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400',
      buttonText: 'View Medicines',
      onClick: handleMedicineAvailable
    },
     {
      id: 'avil-equipment',
      title: 'Avail Equipment',
      icon: <CheckSquare className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400',
      buttonText: 'View Equipments',
      onClick: handleAvailEquipment
    },
    {
      id: 'todo-medicine',
      title: 'Todo List - Medicine',
      icon: <CheckSquare className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400',
      buttonText: 'View Todo List',
      onClick: handleTodoList
    },
    {
      id: 'change-password',
      title: 'Change Password',
      icon: <Lock className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400',
      buttonText: 'Change Password',
      onClick: handleChangePassword
    },
    {
      id: 'logout',
      title: 'Log Out',
      icon: <LogOut className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400',
      buttonText: 'Log Out',
      onClick: handleLogout
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Donor Medicine Dashboard</h1>
          <p className='text-gray-600'>Welcome: {email}</p>
          <p className="text-gray-600">Manage your medicine donations and inventory</p>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-wrap gap-6 justify-center">
          {cards.map((card) => (
            <div 
              key={card.id} 
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-2 w-72"
              onClick={card.onClick}
            >
              {/* Card Header */}
              <div className={`${card.color} text-white p-6 rounded-t-xl`}>
                <div className="flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold text-center">{card.title}</h3>
              </div>

              {/* Card Button */}
              <div className="p-4">
                <button
                  className={`w-full ${card.color} hover:opacity-90 text-white py-3 px-4 rounded-md transition-all font-medium`}
                >
                  {card.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>&copy; 2025 Donor Medicine Management System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default DonorMedicineDashboard;