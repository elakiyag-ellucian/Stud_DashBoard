import React from 'react'
import Count from '../Charts/Count'

const HeadCount = () => {
  return (
    <div className='flex flex-row h-full'>
      <div className='flex flex-col flex-grow'>
        <Count className='flex-grow' />
      </div>
      <div className='border-2 border-black-300 p-10 rounded-2xl m-10 ml-0 text-center shadow-2xl flex-shrink-0 w-1/4' style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h2 className='text-3xl font-medium mb-15'>FILTER</h2>
        <div className='grid grid-cols-1 gap-4'>
          <div className='flex flex-col gap-4 mt-2'>
            <label htmlFor="term">Term</label>
            <input type="text" className='border-b-2 border-gray-500 outline-0 text-center'/>
          </div>
          <div className='flex flex-col gap-4 mt-7'>
            <label htmlFor="deg">Degree</label>
            <select name="" id="deg" className='border-b-2 border-gray-500 outline-0 text-center'>
              <option value="ug" style={{backgroundColor:"#3b4453" , color:"white"}}>Under Graduate</option>
              <option value="pg" style={{backgroundColor:"#3b4453" , color:"white"}}>Post Graduate</option>
            </select>
          </div>
          <div className='flex flex-col gap-4 mt-10'>
            <label htmlFor="crn">Course Reference Number[CRN]</label>
            <input type="text" className='border-b-2 border-gray-500 outline-0 text-center'/>
          </div>
          <button className='border-2 border-black text-xl p-1 rounded-2xl cursor-pointer shadow-cyan-950 text-white lg:mt-20' style={{backgroundColor:"#3b4453"}}>Apply</button>
        </div>
      </div>
    </div>
  )
}

export default HeadCount