import React, { useState } from 'react';
import axios from 'axios'
import { Plus, Mail, Edit, Trash2, Search, X } from 'lucide-react';
import { server_url } from '../config/url';
import { useNavigate } from 'react-router-dom';

const MedicineTodoList = () => {
  const [medicines, setMedicines] = useState([]);
  const [newMedicine, setNewMedicine] = useState({ name: '', email: '' });
  const [emailDetails, setEmailDetails] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [loadingEmail, setLoadingEmail] = useState(null);
   let navigate=useNavigate()
  // Mock email data for demonstration
  const mockEmailData = {
    '': {
      medicine: '',
    company: '',
    expiryDate: '',
    packing: '',
    quantity: '',
    otherInfo:""
    },
  };

  const addMedicine = () => {
    if (newMedicine.email.trim()) {
      const medicine = {
        id: Date.now(),
        name: newMedicine.email, // Use email as the display name
        email: newMedicine.email,
        completed: false,
        createdAt: new Date().toLocaleDateString()
      };
      setMedicines([...medicines, medicine]);
      setNewMedicine({ name: '', email: '' });
    }
  };

  const fetchEmailDetails = async (email, medicineId) => {
    setLoadingEmail(medicineId);
   // alert(email)
    let obj={email:email}
     let url = server_url+"/user/findtodo";
                      
      let resp = await axios.post(url,obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'  } });
       // alert(resp.data)     
      if(resp){
             alert(JSON.stringify(resp.data));
               }
           else{
               alert(resp.data)
               }

    // Simulate API call delay
    setTimeout(() => {
      const details = mockEmailData[email] || {
        medicine:resp.data.medicine,
    company: resp.data.company,
    expiryDate: resp.data.expiryDate,
    packing: resp.data.packing,
    quantity: resp.data.quantity,
    otherInfo: resp.data.otherInfo,
      };
      
      setEmailDetails(prev => ({
        ...prev,
        [medicineId]: details
      }));
      setLoadingEmail(null);
    }, 1000);
  };

  const deleteMedicine = async (id,medicineId) => {
     setLoadingEmail(medicineId); 
   // alert(""+id)
         let url = server_url+"/user/dodeletemedi";
         let token=localStorage.getItem("token")
         alert(token)
          let obj={email:id}            
      let resp = await axios.post(url,obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded','Authorization':`bearer ${token}`} });
        ///alert(resp.data)     
      if(resp){
              alert(resp.data.msg);            
               }
           else{ 
               alert(resp.data.msg)
               }

                setTimeout(() => {
                       if(resp.data.msg!='jwt expired'){
      const details = mockEmailData[id] || {
        medicine:"",
    company: "",
    expiryDate:"",
    packing: "",
    quantity:"",
    otherInformation: "",
      };
      setEmailDetails(prev => ({
        ...prev,
        [medicineId]: details
      }));
    }
      setLoadingEmail(null);
    }, 1000);
  };

  const startEdit = (medicine) => {
    setEditingId(medicine.id);
    setEditForm({ name: medicine.name, email: medicine.email });
  };

  const saveEdit = () => {
    setMedicines(medicines.map(med => 
      med.id === editingId 
        ? { ...med, name: editForm.name, email: editForm.email }
        : med
    ));
    setEditingId(null);
    setEditForm({ name: '', email: '' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: '', email: '' });
  };

  const toggleComplete = (id) => {
    setMedicines(medicines.map(med => 
      med.id === id ? { ...med, completed: !med.completed } : med
    ));
  };
 /// edit medicine
   function EditMedicine(){
    alert("edit")
    navigate('/donor-navbar/medicine-available')
   }
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">
          Listed Medicine
        </h1>
        
        {/* Add Email Form */}
        <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 mb-8 shadow-2xl border border-white/30">
          <h2 className="text-2xl font-semibold text-white mb-4">Add Email</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Email ID"
              value={newMedicine.email}
              onChange={(e) => setNewMedicine({...newMedicine, email: e.target.value})}
              className="px-4 py-2 rounded-lg bg-white/90 border border-white/50 focus:outline-none focus:ring-2 focus:ring-purple-300 placeholder-gray-600"
            />
            <button
              onClick={addMedicine}
              className="bg-white/30 hover:bg-white/40 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 border border-white/50"
            >
              <Plus size={20} />
              Add Email
            </button>
          </div>
        </div>

        {/* Medicine List */}
        <div className="space-y-4">
          {medicines.map((medicine) => (
            <div key={medicine.id} className="bg-white/20 backdrop-blur-lg rounded-xl p-6 shadow-2xl border border-white/30">
              {editingId === medicine.id ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="px-4 py-2 rounded-lg bg-white/90 border border-white/50 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="px-4 py-2 rounded-lg bg-white/90 border border-white/50 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={saveEdit}
                      className="bg-green-500/70 hover:bg-green-500/80 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-500/70 hover:bg-gray-500/80 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={medicine.completed}
                      onChange={() => toggleComplete(medicine.id)}
                      className="w-5 h-5 rounded focus:ring-purple-300"
                    />
                    <div>
                      <h3 className={`text-xl font-semibold ${medicine.completed ? 'line-through text-white/70' : 'text-white'}`}>
                        {medicine.email}
                      </h3>
                      <p className="text-white/80 text-sm">
                        Added: {medicine.createdAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => fetchEmailDetails(medicine.email, medicine.id)}
                      disabled={loadingEmail === medicine.id}
                      className="bg-blue-500/70 hover:bg-blue-500/80 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                    >
                      {loadingEmail === medicine.id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      ) : (
                        <Search size={16} />
                      )}
                      Fetch
                    </button>
                          <button
                      onClick={() => deleteMedicine(medicine.email, medicine.id)}
                      disabled={loadingEmail === medicine.id}
                      className="bg-blue-500/70 hover:bg-blue-500/80 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                    >
                    
                      Delete
                    </button>
                           <button
                      onClick={EditMedicine}
                      disabled={loadingEmail === medicine.id}
                      className="bg-blue-500/70 hover:bg-blue-500/80 text-white px-4 py-2 rounded-lg font-medium 
                      transition-all duration-200 flex items-center gap-2"
                    >
                    
                      Edit
                    </button>
                  </div>
                </div>
              )}

              {/* Email Details */}
              {emailDetails[medicine.id] && (
                <div className="bg-white/30 rounded-lg p-4 mt-4 border border-white/40">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Mail size={20} />
                      Contact Details
                    </h4>
                    <button
                      onClick={() => setEmailDetails(prev => {
                        const newDetails = {...prev};
                        delete newDetails[medicine.id];
                        return newDetails;
                      })}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
                         <div>
                      <p><strong>Medicine:</strong> {emailDetails[medicine.id].medicine}</p>
                      <p><strong>Company:</strong> {emailDetails[medicine.id].company}</p>
                      <p><strong>ExpiryDate:</strong> {emailDetails[medicine.id].expiryDate}</p>
                    </div>
                    <div>
                      <p><strong>Packing:</strong> {emailDetails[medicine.id].packing}</p>
                      <p><strong>Quantity:</strong> {emailDetails[medicine.id].quantity}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p><strong>OtherInformation:</strong> {emailDetails[medicine.id].otherInfo}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {medicines.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/80 text-xl">No email IDs added yet. Add your first email above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineTodoList;