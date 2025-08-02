import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, CheckSquare, Lock, LogOut } from 'lucide-react';
import { useEffect } from 'react';

const NeedyDashboard= () => {
  const navigate=useNavigate()
  let email=localStorage.getItem('email')

  useEffect(()=>{
    let token=localStorage.getItem('logintoken')
    if(!token){
    navigate('/')
    }
  })
  //alert(email)
  const handleDonorDetails = () => {
    console.log('Navigate to Donor Details');
    navigate('needy-detail')
    // You can replace this with your navigation logic
  };

  const handleMedicineAvailable = () => {
    console.log('Navigate to Medicine Available');
     navigate('medicine-find')
    // You can replace this with your navigation logic
  };

  const handleTodoList = () => {
    console.log('Navigate to Todo List');
     navigate('find-equipment')
    // You can replace this with your navigation logic
  };

  // const handleChangePassword = () => {
  //   console.log('Navigate to Change Password');
  //   navigate('/change-password')
  //   // You can replace this with your navigation logic
  // };

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
      title: 'Needy Details',
      icon: <User className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-300',
      buttonText: 'View Needy Details',
      onClick: handleDonorDetails
    },
    {
      id: 'medicine-available',
      title: 'Medicine find',
      icon: <Package className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-300',
      buttonText: 'View Medicines Find',
      onClick: handleMedicineAvailable
    },
    {
      id: 'todo-medicine',
      title: 'Equip find',
      icon: <CheckSquare className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-300',
      buttonText: 'View Equip Find',
      onClick: handleTodoList
    },
    // {
    //   id: 'change-password',
    //   title: 'Change Password',
    //   icon: <Lock className="w-8 h-8" />,
    //   color: 'bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-300',
    //   buttonText: 'Change Password',
    //   onClick: handleChangePassword
    // },
    {
      id: 'logout',
      title: 'Log Out',
      icon: <LogOut className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-300',
      buttonText: 'Log Out',
      onClick: handleLogout
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">needy dashboar</h1>
          <p className="text-gray-600">Welcome: {email}</p>
          <p className="text-gray-600">Fill details And find Medicine carefully</p>
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
          <p>&copy; needy can fill our details and find medicine</p>
        </div>
      </div>
    </div>
  );
};

export default NeedyDashboard;