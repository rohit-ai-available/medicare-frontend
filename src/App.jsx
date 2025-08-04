import React,{useState} from 'react'
import './App.css'
import InPage from './InPage '
import MedicineDonationIndex from './Front-page'
import GeminiImageReader from './GeminiImageReader'
import SignupComponent from './signup and login/Signup'
import { Routes ,Route} from 'react-router-dom'
import MedicineDonationNavbar from './Navbar'
import LoginForm from './signup and login/LoginForm'
import Dashboard from './Dashboard'
import DonorMedicineForm from './medicine form/DonorMedicineForm'
import MedicineFormAvail from './signup and login/Medi'
import MedicineTodoList from './MediTodo.jsx/MedicineTodoList '
import ChangePasswordForm from './change-password/ChangePasswordForm '
import NeedyDashboard from './NeedyDashboard'
import DonorNavbar from './DonorNavbar'
import NeedyProfileComponent from './needyprofile/NeedyProfileComponent'
import MediFinder from './medicine finder/MediFinder'
import NeedyNavbar from './NeedyNavbar'
import EquipmentForm from './equipment/EquipmentForm'
import EquipmentCards from './find equpment/EquipmentCards '
import MedicineDonorContact from './medicine finder/MedicineDonorContact'
function App() {

  return (
    <>
    {/* <GeminiImageReader></GeminiImageReader> */}
    {/* <h1 className='flex justify-center  bg-amber-200'>rohit====</h1> */}
       {/* <SignupComponent></SignupComponent> */}
       {/* <Curd></Curd> */}
       {/* <LoginForm></LoginForm> */}
       {/* <IndexPage></IndexPage> */}
       {/* <InPage></InPage>  */}
        {/* <SignupComponent></SignupComponent> */}
       {/* <MedicineDonationIndex></MedicineDonationIndex> */}
       
       <Routes>
        {/* index page navbar */}
        <Route path='/' element={<MedicineDonationNavbar></MedicineDonationNavbar>}>
        <Route index element={<MedicineDonationIndex></MedicineDonationIndex>}></Route>
          <Route path='/signup' element={<SignupComponent></SignupComponent>}></Route>
         <Route path='/login' element={<LoginForm></LoginForm>}></Route>
        
        </Route>
        {/* donor dashboard navbar */}
        <Route path='/donor-navbar' element={<DonorNavbar></DonorNavbar>}>
          <Route index element={<Dashboard></Dashboard>}></Route>
          <Route path='doner-detail' element={<DonorMedicineForm></DonorMedicineForm>}></Route>
           <Route path='medicine-available' element={<MedicineFormAvail></MedicineFormAvail>}></Route>
                <Route path='/donor-navbar/medicine-available' element={<MedicineFormAvail></MedicineFormAvail>}></Route>
           <Route path='avail-equipment' element={<EquipmentForm></EquipmentForm>}></Route>
          <Route path='todolist' element={<MedicineTodoList></MedicineTodoList>}></Route>
             <Route path='/donor-navbar/todolist' element={<MedicineTodoList></MedicineTodoList>}></Route>
          <Route path='change-password' element={<ChangePasswordForm></ChangePasswordForm>}></Route>
          {/* home page */}
         </Route>
         
          {/* needy dash board navbar */}
          <Route path='/needy-navbar' element={<NeedyNavbar></NeedyNavbar>}>
           <Route index element={<NeedyDashboard></NeedyDashboard>}></Route>
           <Route path='needy-detail' element={<NeedyProfileComponent></NeedyProfileComponent>}></Route>
           <Route path='medicine-find' element={<MediFinder></MediFinder>}></Route>
            <Route path='find-equipment' element={<EquipmentCards></EquipmentCards>}></Route>
              <Route path='/needy-navbar/contact-page' element={<MedicineDonorContact></MedicineDonorContact>}></Route>
              <Route path='/needy-navbar/contact-page2' element={<MedicineDonorContact></MedicineDonorContact>}></Route>

          </Route>
       </Routes>
    </>
  )
}

export default App
