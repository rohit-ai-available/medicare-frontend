import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, CheckSquare, Lock, LogOut, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const DonorMedicineDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  useEffect(() => {
    let token = localStorage.getItem('logintoken');
    if (!token) {
      navigate('/');
    }
  });
  
  let email = localStorage.getItem('email');
  
  const handleDonorDetails = () => {
    console.log('Navigate to Donor Details');
    navigate('doner-detail');
  };

  const handleMedicineAvailable = () => {
    console.log('Navigate to Medicine Available');
    navigate('medicine-available');
  };
  
  const handleAvailEquipment = () => {
    console.log('Navigate to Avail Equipments');
    navigate('avail-equipment');
  };

  const handleTodoList = () => {
    console.log('Navigate to Todo List');
    navigate('todolist');
  };

  const handleChangePassword = () => {
    console.log('Navigate to Change Password');
    navigate('change-password');
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
      title: 'Donor Details',
      icon: <User className="w-5 h-5" />,
      onClick: handleDonorDetails
    },
    {
      id: 'medicine-available',
      title: 'Medicine Available',
      icon: <Package className="w-5 h-5" />,
      onClick: handleMedicineAvailable
    },
    {
      id: 'avil-equipment',
      title: 'Avail Equipment',
      icon: <CheckSquare className="w-5 h-5" />,
      onClick: handleAvailEquipment
    },
    {
      id: 'todo-medicine',
      title: 'Todo List - Medicine',
      icon: <CheckSquare className="w-5 h-5" />,
      onClick: handleTodoList
    },
    {
      id: 'change-password',
      title: 'Change Password',
      icon: <Lock className="w-5 h-5" />,
      onClick: handleChangePassword
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
                  Medicine Donor
                </h2>
                <p className="text-xs text-indigo-300 mt-1">Management System</p>
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
              Donor Medicine Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your medicine donations and inventory
            </p>
          </div>

          {/* Quick Stats or Content Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Donor Details Card */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Donor Details</h3>
              <p className="text-sm text-gray-600 mb-4">View and manage donor information</p>
              <button
                onClick={handleDonorDetails}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-2 px-4 rounded-lg transition-all font-medium shadow-md"
              >
                View Details
              </button>
            </div>

            {/* Medicine Available Card */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Medicine Available</h3>
              <p className="text-sm text-gray-600 mb-4">Browse available medicines</p>
              <button
                onClick={handleMedicineAvailable}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-2 px-4 rounded-lg transition-all font-medium shadow-md"
              >
                View Medicines
              </button>
            </div>

            {/* Avail Equipment Card */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <CheckSquare className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Avail Equipment</h3>
              <p className="text-sm text-gray-600 mb-4">Check available equipment</p>
              <button
                onClick={handleAvailEquipment}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-2 px-4 rounded-lg transition-all font-medium shadow-md"
              >
                View Equipment
              </button>
            </div>

            {/* Todo List Card */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border-l-4 border-orange-500">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                  <CheckSquare className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Todo List - Medicine</h3>
              <p className="text-sm text-gray-600 mb-4">Manage your medicine tasks</p>
              <button
                onClick={handleTodoList}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-2 px-4 rounded-lg transition-all font-medium shadow-md"
              >
                View Todo List
              </button>
            </div>

            {/* Change Password Card */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border-l-4 border-indigo-500">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Change Password</h3>
              <p className="text-sm text-gray-600 mb-4">Update your account password</p>
              <button
                onClick={handleChangePassword}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-2 px-4 rounded-lg transition-all font-medium shadow-md"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DonorMedicineDashboard;
