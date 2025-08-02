import React, { useState } from 'react'
import SignupComponent from './signup and login/Signup'
import LoginForm from './signup and login/LoginForm'
import DonorMedicineForm from './medicine form/DonorMedicineForm'
import MedicineForm from './signup and login/Medi'
import MedicineDonationNavbar from './Navbar'
import MedicineDonationIndex from './Front-page'
import MedicineTodoList from "./MediTodo.jsx/MedicineTodoList "
import NeedyProfileComponent from './needyprofile/NeedyProfileComponent'
import { Routes,Route } from 'react-router-dom'
import MediFinder from './medicine finder/MediFinder'
import MedicineDonationForm from "./medicine form/AvailMedi"
function InPage () {
  const [Showsignup,setsignup]=useState(false)
  const [Showslogin,setlogin]=useState(false)
   const [ShowsMedicineform,setMedicineform]=useState(false)
    const [ShowsAvailMedi,setAvailMedi]=useState(false)
     const [Showsfrontpage,setfrontpage]=useState(true)
  let dosignup=()=>{
    alert()
    setsignup(true);
    setlogin(false);
    setMedicineform(false)
    setfrontpage(false)
  }
   let dologin=()=>{ 
    alert()
    setlogin(true);
     setsignup(false);
     setMedicineform(false)
     setfrontpage(false)
  }
  function DoMedicineForm(data){
   // if(data==true)
    setMedicineform(true)
     setlogin(false);
     setsignup(false);
     setfrontpage(false)
  }
  function refAvailMedi(data){
    alert(data)
    if(data==true){
      setAvailMedi(true)
        setlogin(false);
     setsignup(false);
     setMedicineform(false)
     setfrontpage(false)
    }
  }
  return (

    <div >
      {/* ****************  navbar ********** */}
          <MedicineDonationNavbar refsignup={dosignup} reflogin={dologin}></MedicineDonationNavbar>
       {/* {Showsignup && <SignupComponent></SignupComponent>}  */}
       {/* { Showslogin && <LoginForm funref={DoMedicineForm}></LoginForm>} */}
       {/* <MedicineTodoList></MedicineTodoList> */}
       {/* <NeedyProfileComponent></NeedyProfileComponent> */}
       {/* <MediFinder></MediFinder> */}
       {/* { Showsfrontpage && <MedicineDonationIndex></MedicineDonationIndex>} */}
      {/* { ShowsMedicineform && <DonorMedicineForm refAvailMedi={refAvailMedi}></DonorMedicineForm>} */}
       {/* <MedicineDonationForm></MedicineDonationForm> */}
      {/* {ShowsAvailMedi && <MedicineForm></MedicineForm>} */}
      </div>
  )
}

export default InPage 
