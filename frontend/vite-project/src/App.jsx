import React, {useState} from 'react'
import { BrowserRouter as Routers , Route , Routes } from 'react-router-dom'

import Login from './Components/Login.jsx'
import Home from './Components/Home.jsx'
import Insights from './Components/Insights.jsx'
import Trends from './Components/Trends.jsx'
import Reports from './Components/Reports.jsx'
import NavBar from './Components/NavBar.jsx'

import { HiMenu } from "react-icons/hi";

const App = () => {
  const [auth,setAuth]=useState(false)
  const authUser = auth
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
    <Routers>
      <div
        className='pl-10 p-2 flex items-center justify-between'
        style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
      >
        <div className='cursor-pointer pl-5'><HiMenu /></div>
        <div className='pl-150 text-lg font-semibold'>RegiTrack Dashboard</div>
        <div className='pl-120'>
          <img src='ellucian.jpg' alt='' className='w-1/5 rounded-full justify-self-end ' />
        </div>
      </div>

      <div className='pb-20 mt-10 flex flex-row h-[calc(100vh-48px)]'>
        {authUser && (
          <div className='h-full'>
            {<NavBar />}
          </div>
        )}
        <div className='flex-1 overflow-auto ml-10 mr-10' style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}>
          <Routes>
            <Route path='/' element={<Login setauth={setAuth}/>} />
            <Route path='/home' element={<Home />} />
            <Route path='/insights' element={<Insights />} />
            <Route path='/trends' element={<Trends />} />
            <Route path='/reports' element={<Reports />} />
          </Routes>
        </div>
      </div>
    </Routers>
  </div>
  )
}

export default App