import React from 'react'
import Trend from '../Charts/Trend'

const Trends = () => {
  return (
    <div className='flex flex-row h-full flex-warp'>
      <div className='flex flex-col flex-grow'>
        <Trend className='flex-grow' />
      </div>
      <div className='border-2 border-black-300 p-10 rounded-2xl m-10 ml-0 text-center shadow-2xl flex-shrink-0 w-1/4' style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h2 className='text-3xl font-medium mb-20'>FILTERS</h2>
        <div className='grid grid-cols-1 gap-4'>
          <div className='flex flex-row justify-between gap-4 mt-2'>
            <label htmlFor="term1">Term 1</label>
            <input type="text" id="term1" className='border-b-2 border-gray-500 outline-0 text-center w-1/2'/>
          </div>
          <div className='flex flex-row justify-between gap-4 mt-2'>
            <label htmlFor="deg1">Degree 1</label>
            <select id="deg1" className='border-b-2 border-gray-500 outline-0 text-center w-1/2'>
              <option value="ug" style={{backgroundColor:"#3b4453" , color:"white"}}>Under Graduate</option>
              <option value="pg" style={{backgroundColor:"#3b4453" , color:"white"}}>Post Graduate</option>
            </select>
          </div>
          <div className='flex flex-row  justify-between gap-4 mt-2'>
            <label htmlFor="crn1">CRN 1</label>
            <input type="text" id="crn1" className='border-b-2 border-gray-500 outline-0 text-center w-1/2'/>
          </div>
          <div className='flex flex-row justify-between gap-4 mt-20'>
            <label htmlFor="term2">Term 2</label>
            <input type="text" id="term2" className='border-b-2 border-gray-500 outline-0 text-center w-1/2'/>
          </div>
          <div className='flex flex-row justify-between  gap-4 mt-2'>
            <label htmlFor="deg2">Degree 2</label>
            <select id="deg2" className='border-b-2 border-gray-500 outline-0 text-center w-1/2'>
              <option value="ug" style={{backgroundColor:"#3b4453" , color:"white"}}>Under Graduate</option>
              <option value="pg" style={{backgroundColor:"#3b4453" , color:"white"}}>Post Graduate</option>
            </select>
          </div>
          <div className='flex flex-row justify-between  gap-4 mt-2'>
            <label htmlFor="crn2">CRN 2</label>
            <input type="text" id="crn2" className='border-b-2 border-gray-500 outline-0 text-center w-1/2'/>
          </div>
          <button className='border-2 border-black text-xl p-1 rounded-2xl cursor-pointer shadow-cyan-950 text-white mt-20' style={{backgroundColor:"#3b4453"}}>Apply</button>
        </div>
      </div>
    </div>
  )
}

export default Trends