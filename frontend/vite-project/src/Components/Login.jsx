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
    <div className='w-full h-screen m-0 flex justify-center items-center '>
      <div className='p-10 w-4/5 rounded-2xl flex justify-evenly items-center gap-2.5 lg:w-1/3 sm:w-3/5' style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
        <div className='w-full h-full flex flex-col justify-evenly gap-4 items-center sm:flex-row' style={{ opacity: 1 }}>
          <div>
            <img src="ellucian.jpg" alt="" className='h-35 md:h-auto rounded-full' />
          </div>
          
          <div className='text-center'>
            <h1 className='text-3xl text-center font-medium'>Welcome to RegiTrack Dashboard</h1>
            <h4 className='mt-4 text-lg text-center font-medium'>To Proceed</h4>
            <button className='my-2.5 w-1/2 shadow-2xl border text-center items-center border-gray-400 text-white cursor-pointer px-4 py-2 text-lg rounded-lg sm:text-base lg:text-lg' style={{ backgroundColor: '#783F8C' }}> <a href="http://localhost:4001/auth/google">Login with Google</a></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;