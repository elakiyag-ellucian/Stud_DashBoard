import React from 'react'

const Term02 = () => {
  return (
    <div className='flex flex-row h-full'>
            <div className="flex-grow" style={{ position: 'relative', height: '100%' }}>
                <Bar options={options} data={chartData} className='p-16 text-black'/>
            </div>
            <div className='border-2 border-black-300 p-10 rounded-2xl m-10 ml-0 text-center shadow-2xl'>
                <h2 className='text-3xl font-medium mb-15'>FILTER</h2>
                <div className='grid grid-cols-1 gap-15 mt-5'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="term">Term</label>
                        <input type="text" className='border-b-2 border-gray-500 outline-0 text-center'/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="deg">Degree</label>
                        <select name="" id="deg" className='border-b-2 border-gray-500 outline-0 text-center'>
                            <option value="ug">Under Graduate</option>
                            <option value="pg">Post Graduate</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="crn">Course Reference Number[CRN]</label>
                        <input type="text" className='border-b-2 border-gray-500 outline-0 text-center'/>
                    </div>
                    <button className='border-2 p-1 rounded-2xl cursor-pointer' style={{backgroundColor:"#3b4453"}}>Apply</button>
                </div>
            </div>
        </div>
  )
}

export default Term02