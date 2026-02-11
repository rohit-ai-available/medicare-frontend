import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, CheckSquare, Lock, LogOut, Menu, X, Search } from 'lucide-react';
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
      title: 'Equipment Find',
      icon: <Search className="w-5 h-5" />,
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
        } bg-gradient-to-b from-pink-900 via-purple-900 to-indigo-900 text-white transition-all duration-300 ease-in-out shadow-2xl flex flex-col fixed md:relative h-screen z-50`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-pink-700">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <div className="flex-1">
                <h2 className="text-xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
                  Needy Portal
                </h2>
                <p className="text-xs text-pink-300 mt-1">Medicine Finder System</p>
              </div>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-pink-800 transition-colors"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* User Info */}
        {isSidebarOpen && (
          <div className="p-6 bg-gradient-to-r from-pink-800 to-purple-800 border-b border-pink-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">Welcome</p>
                <p className="text-xs text-pink-200 truncate">{email}</p>
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
                      : 'hover:bg-pink-700 hover:shadow-lg hover:shadow-pink-500/50'
                  }`}
                  title={!isSidebarOpen ? item.title : ''}
                >
                  <span className={item.isDanger ? 'text-red-300' : 'text-pink-200'}>
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
        <div className="p-4 border-t border-pink-700">
          {isSidebarOpen && (
            <p className="text-xs text-pink-300 text-center">
              &copy; 2025 Needy Portal
            </p>
          )}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full md:w-auto">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden fixed top-4 left-4 z-30 p-2 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-lg shadow-lg"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="max-w-6xl mx-auto mt-16 md:mt-0">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Needy Dashboard
            </h1>
            <p className="text-gray-600">
              Fill details and find medicine carefully
            </p>
          </div>

          {/* Quick Stats or Content Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Needy Details Card */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border-l-4 border-pink-500">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Needy Details</h3>
              <p className="text-sm text-gray-600 mb-4">View and manage your information</p>
              <button
                onClick={handleDonorDetails}
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white py-2 px-4 rounded-lg transition-all font-medium shadow-md"
              >
                View Needy Details
              </button>
            </div>

            {/* Medicine Find Card */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Medicine Find</h3>
              <p className="text-sm text-gray-600 mb-4">Search for available medicines</p>
              <button
                onClick={handleMedicineAvailable}
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:from-purple-600 hover:via-pink-600 hover:to-rose-600 text-white py-2 px-4 rounded-lg transition-all font-medium shadow-md"
              >
                View Medicines Find
              </button>
            </div>

            {/* Equipment Find Card */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border-l-4 border-indigo-500">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 flex items-center justify-center">
                  <Search className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Equipment Find</h3>
              <p className="text-sm text-gray-600 mb-4">Search for medical equipment</p>
              <button
                onClick={handleTodoList}
                className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white py-2 px-4 rounded-lg transition-all font-medium shadow-md"
              >
                View Equip Find
              </button>
            </div>
          </div>

          {/* Info Banner */}
          <div className="mt-8 bg-gradient-to-r from-pink-100 to-purple-100 border-l-4 border-pink-500 p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-pink-800">Important Information</h3>
                <p className="mt-2 text-sm text-pink-700">
                  Fill in your details carefully and search for the medicines you need. Make sure all information is accurate.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-gray-500">
            <p className="text-sm">&copy; Needy can fill details and find medicine</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NeedyDashboard;
