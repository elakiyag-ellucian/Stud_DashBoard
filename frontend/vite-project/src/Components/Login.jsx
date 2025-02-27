import React, { useState } from 'react';
import axios from 'axios';
import { GoPersonFill } from "react-icons/go";
import { RiLockPasswordFill } from "react-icons/ri";

const Login = () => {
  const [name,setName]=useState('')
  const [password,setPassword]=useState('')
  console.log(name , password)
  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post("",{name,password})
    .then(res=> console.log(res))
    .catch(err=>console.log(err))
  }
  /* function noZoom(e){
    e.preventDefault();
  } */
  return (
    <>
    <div className='container' /* onDoubleClick={(e)=>{noZoom(e)}} */>
        <div className='Login_container'>
          <div className='Login_img_container'>
            <img src="ellucian.jpg" alt="" className='Login_img' />
          </div>
          <form onSubmit={handleSubmit}>
            <div className='Login_formdiv'>
              <h1 className='Login_heading'>Login</h1>
              <div className='Login_form'>
                <GoPersonFill />
                <input type="text" id="name" placeholder='Username' onChange={(e)=>{setName(e.target.value)}}/>
              </div>
              <div className='Login_form'>
                <RiLockPasswordFill />
                <input type="password" id="password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
              </div>
              <div>
                <button className='Login_btn'>Submit</button>
              </div>
            </div>
          </form>
        </div>
    </div>
    </>
  )
}

export default Login