import React, { useState, useEffect } from 'react';
import { GoPersonFill } from "react-icons/go";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const Login = ({ setauth }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [socket, setSocket] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000');

    ws.addEventListener('open', () => {
      console.log('WebSocket connection established');
    });

    ws.addEventListener('message', (event) => {
      const response = JSON.parse(event.data);
      console.log(response.message);
      if (response.success) {
        setauth(true);
        navigate("/home"); // Use lowercase path
      }
    });

    setSocket(ws);

    return () => ws.close();
  }, [setauth, navigate]);

  const validate = () => {
    const newError = {};
    if (!name) {
      newError.name = 'Username is required';
    }
    if (!password) {
      newError.password = 'Password is required';
    } else if (password.length < 5) {
      newError.password = 'Password must be at least 8 characters';
    }
    return newError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateError = validate();
    setError(validateError);
    if (Object.keys(validateError).length === 0) {
      console.log('Form submitted successfully!', name, password);
      if (name && password) {
        const loginData = { name, password };
        socket.send(JSON.stringify(loginData));
      }
    }
  };

  return (
    <div className='w-full h-screen m-0 flex justify-center items-center'>
      <div className='p-5 w-4/5 rounded-2xl flex justify-evenly items-center gap-2.5 lg:w-1/3 sm:w-3/5' style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
        <div className='w-full h-full flex flex-col justify-evenly gap-4 items-center sm:flex-row' style={{ opacity: 1 }}>
          <div>
            <img src="ellucian.jpg" alt="" className='h-35 md:h-auto rounded-full' />
          </div>
          <form onSubmit={handleSubmit}>
            <div className='text-center my-3.5 grid gap-3'>
              <h1 className='text-2xl font-medium'>Login</h1>
              <div className='border-b border-black mb-2.5 p-0 flex flex-row justify-evenly'>
                <span className='py-3'><GoPersonFill /></span>
                <input type="text" autoComplete="off" className='w-4/5 px-4 text-lg bg-transparent outline-none border-none sm:text-base lg:text-lg' placeholder='Username' onChange={(e) => { setName(e.target.value) }} />
              </div>
              {error?.name && <span className='text-red-700'>{error?.name}</span>}
              <div className='border-b border-black mb-2.5 p-0 flex flex-row justify-evenly'>
                <span className='py-3'><RiLockPasswordFill /></span>
                <input type="password" autoComplete="off" className='w-4/5 px-4 text-lg bg-transparent outline-none border-none sm:text-base lg:text-lg' placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} />
              </div>
              {error?.password && <span className='text-red-700'>{error?.password}</span>}
              <div>
                <button className='my-2.5 w-1/2 shadow-2xl border border-gray-400 text-white cursor-pointer px-4 py-2 text-lg rounded-lg sm:text-base lg:text-lg' style={{ backgroundColor: '#783F8C' }}>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;