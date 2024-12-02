'use client';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function WeatherGraph({ weatherData }) {
  const locationName = weatherData?.location?.name || 'Unknown';
  const temperature = weatherData?.current?.temp_c || 0;
  const humidity = weatherData?.current?.humidity || 0;
  const windSpeed = weatherData?.current?.wind_kph || 0;
  const localTime = weatherData?.location?.localtime || '';

  
  const chartData = {
    labels: ['Temperature (°C)', 'Humidity (%)', 'Wind Speed (kph)'],
    datasets: [
      {
        label: `Weather Stats for ${locationName}`,
        data: [temperature, humidity, windSpeed],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || '';
            const value = context.raw;
            const unit = context.label === 'Temperature (°C)' ? '°C' : context.label === 'Wind Speed (kph)' ? 'kph' : '%';
            return `${label}: ${value} ${unit}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Metrics',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Values',
        },
      },
    },
  };

  return (
    <div className="w-full h-64">
      <Line data={chartData} options={options} />
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Data last updated: {localTime}
        </p>
      </div>
    </div>
  );
}

export default WeatherGraph;
