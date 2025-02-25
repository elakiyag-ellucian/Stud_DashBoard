import React from 'react'

const Login = () => {
  return (
    <>
        <div className='Login_container'>
          <div className='Login_img'>
            <img src="ellucian-logo.png" alt="" className='Login_img'/>
          </div>
          <div className='Login_formdiv'>
            <h1 className='Login_heading'>Login</h1>
            <div className='Login_form'>
              <input type="text" id="name" placeholder='Username'/>
            </div>
            <div className='Login_form'>
              <input type="password" id="password" placeholder='Password'/>
            </div>
            <div>
              <button className='Login_btn'>Submit</button>
            </div>
          </div>
        </div>
    </>
  )
}

export default Login