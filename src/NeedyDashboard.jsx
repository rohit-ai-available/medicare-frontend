import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, CheckSquare, Lock, LogOut, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const NeedyDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  let email = localStorage.getItem('email');

  useEffect(() => {
    let token = localStorage.getItem('logintoken');
    if (!token) {
      navigate('/');
    }
  });

  const handleDonorDetails = () => {
    console.log('Navigate to Donor Details');
    navigate('needy-detail');
  };

  const handleMedicineAvailable = () => {
    console.log('Navigate to Medicine Available');
    navigate('medicine-find');
  };

  const handleTodoList = () => {
    console.log('Navigate to Todo List');
    navigate('find-equipment');
  };

  const handleLogout = () => {
    console.log('Logging out...');
    alert('Logging out...');
    localStorage.removeItem('logintoken');
    navigate("/");
  };

  const menuItems = [
    {
      id: 'donor-details',
      title: 'Needy Details',
      icon: <User className="w-5 h-5" />,
      onClick: handleDonorDetails
    },
    {
      id: 'medicine-available',
      title: 'Medicine Find',
      icon: <Package className="w-5 h-5" />,
      onClick: handleMedicineAvailable
    },
    {
      id: 'todo-medicine',
      title: 'Equip Find',
      icon: <CheckSquare className="w-5 h-5" />,
      onClick: handleTodoList
    },
    {
      id: 'logout',
      title: 'Log Out',
      icon: <LogOut className="w-5 h-5" />,
      onClick: handleLogout,
      isDanger: true
    }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-72' : 'w-20'
        } bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-800 text-white transition-all duration-300 ease-in-out shadow-2xl flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-indigo-700">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <div className="flex-1">
                <h2 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Needy Portal
                </h2>
                <p className="text-xs text-indigo-300 mt-1">Medicine Finder System</p>
              </div>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-indigo-800 transition-colors"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* User Info */}
        {isSidebarOpen && (
          <div className="p-6 bg-gradient-to-r from-indigo-800 to-purple-800 border-b border-indigo-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">Welcome</p>
                <p className="text-xs text-indigo-200 truncate">{email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={item.onClick}
                  className={`w-full flex items-center ${
                    isSidebarOpen ? 'px-4' : 'px-3 justify-center'
                  } py-3 rounded-lg transition-all duration-200 group ${
                    item.isDanger
                      ? 'hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/50'
                      : 'hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/50'
                  } ${!isSidebarOpen && 'tooltip-container'}`}
                  title={!isSidebarOpen ? item.title : ''}
                >
                  <span className={item.isDanger ? 'text-red-300' : 'text-indigo-200'}>
                    {item.icon}
                  </span>
                  {isSidebarOpen && (
                    <span className="ml-3 text-sm font-medium">{item.title}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-indigo-700">
          {isSidebarOpen && (
            <p className="text-xs text-indigo-300 text-center">
              &copy; 2025 Medicine Management
            </p>
          )}
        </div>
      </aside>
      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Needy Dashboard
            </h1>
            <p className="text-gray-600">
              Fill details and find medicine carefully
            </p>
          </div>

          {/* Quick Stats or Content Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Needy Details Card */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Needy Details</h3>
              <p className="text-sm text-gray-600 mb-4">View and manage your information</p>
              <button
                onClick={handleDonorDetails}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-2 px-4 rounded-lg transition-all font-medium shadow-md"
              >
                View Needy Details
              </button>
            </div>

            {/* Medicine Find Card */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Medicine Find</h3>
              <p className="text-sm text-gray-600 mb-4">Search for available medicines</p>
              <button
                onClick={handleMedicineAvailable}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-2 px-4 rounded-lg transition-all font-medium shadow-md"
              >
                View Medicines Find
              </button>
            </div>

            {/* Equip Find Card */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <CheckSquare className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Equip Find</h3>
              <p className="text-sm text-gray-600 mb-4">Search for medical equipment</p>
              <button
                onClick={handleTodoList}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-2 px-4 rounded-lg transition-all font-medium shadow-md"
              >
                View Equip Find
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NeedyDashboard;
