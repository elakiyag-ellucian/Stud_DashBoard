import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { GoPersonFill } from "react-icons/go";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [name,setName]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState('')
  const [socket, setSocket] = useState(null);
  const navigate=useNavigate()

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000');

    ws.addEventListener('open', () => {
        console.log('WebSocket connection established');
    });

    ws.addEventListener('message', (event) => {
        const response = JSON.parse(event.data);
        console.log(response.message);
        if(response.success){
          navigate("/Menu")
        }
        
    });

    setSocket(ws);

    return () => ws.close();
  }, []);


  const validate = () => {
    const newError = {}
    if(!name) {
      newError.name = 'Username is required'
    }
    if (!password) {
      newError.password = 'Password is required'
    } else if (password.length < 5) {
      newError.password = 'Password must be at least 8 characters'
    }
    return newError
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const validateError = validate()
    setError(validateError)
    if (Object.keys(validateError).length === 0) {
      console.log('Form submitted successfully!', name,password)
      /* axios.post("",{name,password})
    .then(res=> console.log(res))
    .catch(err=>console.log(err)) */
      if (name && password) {
        const loginData = { name, password };
        socket.send(JSON.stringify(loginData));
      } 
    }
  }
  return (
    <>
    <div className='Login_main'>
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
              {error.name && <span className='Login_error'>{error.name}</span>}
              <div className='Login_form'>
                <RiLockPasswordFill />
                <input type="password" id="password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
              </div>
              {error.password && <span className='Login_error'>{error.password}</span>}
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