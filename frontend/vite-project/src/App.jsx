import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './Components/Login.jsx';
import Home from './Components/Home.jsx';
import Insights from './Components/Insights.jsx';
import Trends from './Components/Trends.jsx';
import Reports from './Components/Reports.jsx';
import NavBar from './Components/NavBar.jsx';

import { RiDashboard2Fill } from "react-icons/ri";

const App = () => {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    fetch('http://localhost:4001/api/auth/check', { credentials: 'include' })
      .then(response => response.json())
      .then(data => setAuth(data.authenticated))
      .catch(error => console.error('Auth check failed:', error));
  }, []);
  return (
    <div
      style={{
        backgroundImage: `url(Login-bg.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      <Router>
        {auth ? (
          <>
            <div
              className='pl-10 p-2 flex items-center justify-between shadow-md'
              style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
            >
              <div className='cursor-pointer pl-5'><RiDashboard2Fill className='text-3xl'/></div>
              <div className='text-lg font-semibold justify-self-start'>RegiTrack Dashboard</div>
              <div >
                <img src='ellucian.jpg' alt='' className='w-1/5 rounded-full justify-self-end ' />
              </div>
            </div>

            <div className='pb-20 mt-10 flex flex-row h-[calc(100vh-48px)]'>
              <div className='h-full shadow-2xl'>
                <NavBar />
              </div>
              <div className='flex-1 overflow-auto ml-10 mr-10 shadow-2xl' style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}>
                <Routes>
                  <Route path='/home' element={<Home />} />
                  <Route path='/insights' element={<Insights />} />
                  <Route path='/trends' element={<Trends />} />
                  <Route path='/reports' element={<Reports />} />
                  <Route path='*' element={<Navigate to="/home" />} />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <Routes>
            <Route path='/' element={<Login setauth={setAuth} />} />
            <Route path='*' element={<Navigate to="/" />} />
          </Routes>
        )}
      </Router>
    </div>
  );
};

export default App;

