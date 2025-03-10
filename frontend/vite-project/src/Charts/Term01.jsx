import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from "react-chartjs-2";

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

const Term01 = () => {
    const [chartData, setChartData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [2, 5, 8, 2, 8, 5, 8],
                backgroundColor: '#3b4453',
            }
        ],
    });

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:4001'); // Replace with your WebSocket URL

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setChartData((prevData) => ({
                ...prevData,
                datasets: [
                    {
                        ...prevData.datasets[0],
                        data: data.values, // Assuming the backend sends an array of values
                    }
                ],
            }));
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            socket.close();
        };
    }, []);

    return (
        <div className="h-full flex-grow" style={{ position: 'relative', height: '100%' }}>
            <Bar options={options} data={chartData} className='p-16 text-black'/>
        </div>
    );
};

export default Term01;