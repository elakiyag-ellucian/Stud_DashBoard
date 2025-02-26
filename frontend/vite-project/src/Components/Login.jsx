import React from 'react'
import { GoPersonFill } from "react-icons/go";
import { RiLockPasswordFill } from "react-icons/ri";

const Login = () => {
  return (
    <>
    <div className='container'>
        <div className='Login_container'>
          <div className='Login_img_container'>
            <img src="ellucian.jpg" alt="" className='Login_img' />
          </div>
          <div className='Login_formdiv'>
            <h1 className='Login_heading'>Login</h1>
            <div className='Login_form'>
              <GoPersonFill />
              <input type="text" id="name" placeholder='Username'/>
            </div>
            <div className='Login_form'>
              <RiLockPasswordFill />
              <input type="password" id="password" placeholder='Password'/>
            </div>
            <div>
              <button className='Login_btn'>Submit</button>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Login