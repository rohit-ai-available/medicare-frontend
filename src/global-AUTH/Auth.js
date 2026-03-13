import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { server_url } from '../config/url';
export  async function Auth() {
    let token = localStorage.getItem('logintoken');
 
    //alert(token)
    if (!token) 
      navigate('/');

       let resp= await axios.post(server_url+"/user/dashboard",{},{
        headers:{Authorization:`Bearer ${token}`}
      })
      //  alert(JSON.stringify(resp))
      if(resp.data.status==false){
          alert("please Re-login")
          window.location.href="/"
      }
  }  
  



