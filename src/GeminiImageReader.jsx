import React, { useState } from 'react';
import axios from 'axios'
import { server_url } from './config/url';
const GeminiImageReader = () => {
  const [file,setfile]=useState(null)
  async function doupload(event){
    alert(file)
    let formData=new FormData()
      formData.append("imggg",file)
      let url = server_url+"/user/picreader";
          let resp = await axios.post(url,formData, {headers: {'Content-Type': 'multipart/form-data'  } });
          //alert(JSON.stringify(resp.data));
              if(resp.data.status==true){
                alert(JSON.stringify(resp.data))
               
              }
              else{
                alert(JSON.stringify(resp.data))
              }
  }
    return(
      <>
     <center>
      <div className=''>
         upload file:<input type="file" onChange={(event)=> setfile(event.target.files[0])} className='w-50 h-10 border-1 rounded-2xl p-2 '  />
         <input type="button" value="upload" onClick={doupload}  className='ml-2 bg-gray-200 w-15 h-10 rounded-2xl'/>
      </div>
     </center>
      </>
    )
                
};

export default GeminiImageReader;
