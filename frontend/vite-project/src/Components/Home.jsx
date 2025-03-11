
import React from 'react'

const Home = () => {
  return (
    <div className='text-center p-8 pl-30 pr-30 lg:mt-20'>
      <h1 className='text-4xl font-bold'>Welcome to RegiTrack Dashboard</h1>
      <div className='grid grid-cols-3 gap-20 mt-20'>
        <div className='border-2 border-black-200 p-4 rounded-xl'>
          <h1 className='text-2xl font-medium'>Insights</h1>
          <p className='p-4 mt-5'>Get a quick snapshot of current registration activity, including total registrations, course popularity, and live updates. Filter data by term, date range, and student groups for a clearer view of ongoing trends.</p>
        </div>
        <div className='border-2 border-black-200 p-4 rounded-xl'>
          <h1 className='text-2xl font-medium'>Trends</h1>
          <p className='p-4 mt-5'>Analyze how registration patterns evolve over time. Compare current term activity with historical data from previous years and identify emerging trends and popular courses.</p>
        </div>
        <div className='border-2 border-black-200 p-4 rounded-xl'>
          <h1 className='text-2xl font-medium'>Reports</h1>
          <p className='p-4 mt-5'>Access detailed, well-structured reports on registration volumes, student demographics, and course enrollments. Export data for further analysis and administrative decision-making.</p>
        </div>
      </div>
    </div>
  )
}

export default Home