import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import {Bar} from "react-chartjs-2";
import { color } from 'chart.js/helpers';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export const options = {
responsive: true,
maintainAspectRatio: false,
plugins: {
    legend: {
    position: 'top',
    },
    title: {
    display: true,
    text: 'Chart.js Bar Chart',
    },
},
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
labels,
datasets: [
    {
    label: 'Dataset 1',
    data: [2,5,8,2,8,5,8],
    backgroundColor: '#3b4453',
    color: 'black'
    },
    {
        label: 'Dataset 2',
        data: [3,5,2,5,2,6,3],
        backgroundColor: '#7f6f60',
        color: 'black'
    }
],
};

const Trend = () => {
  return (
    <div className="flex-grow" style={{position: 'relative', height: '50%',color:'black' }}>
        <Bar options={options} data={data} className='p-16 text-black'/>
    </div>
  )
}

export default Trend