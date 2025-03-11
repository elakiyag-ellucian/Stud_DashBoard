import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const centerTextPlugin = {
  id: 'centerText',
  beforeDraw: (chart) => {
    const { ctx, width, height } = chart;
    ctx.restore();
    const fontSize = (height / 114).toFixed(2);
    ctx.font = `${fontSize}em sans-serif`;
    ctx.textBaseline = 'middle';

    const total = chart.config.data.datasets[0].data.reduce((a, b) => a + b, 0);
    const text = `${chart.config.data.datasets[0].data[0]}`;
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 2;

    ctx.fillText(text, textX, textY);
    ctx.save();
  }
};

ChartJS.register(centerTextPlugin);

const Count = () => {
  const data = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        label: '# of Votes',
        data: [20, (50-20)], // Example: 30 out of 50
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255,255,255, 0.2)'
        ],
        borderColor: [
          'rgba(255,255,255, 0.2)'
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        display: false,
      },
      centerText: true,
    },
  };

  return (
    <>
        <div className='w-1/2 text-center'>
        <Doughnut data={data} options={options} />
        </div>
    </>
  )
};

export default Count;