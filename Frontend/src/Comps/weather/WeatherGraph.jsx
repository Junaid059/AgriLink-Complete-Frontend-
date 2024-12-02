'use client';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

function WeatherGraph({ data }) {
    console.log("Weather Data:", data); 

 
    if (!data || !data.forecast || !Array.isArray(data.forecast.forecastday) || data.forecast.forecastday.length === 0) {
        return <div>Error: Weather data not available</div>;
    }

    //Extracting hourly data from the forecastday array
    const hourlyData = data.forecast.forecastday[0].hour;

    
    const labels = hourlyData.map((entry) => entry.time.split(" ")[1]); 
    const temperatures = hourlyData.map((entry) => entry.temp_c);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Temperature (°C)',
                data: temperatures,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                tension: 0.4,
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
                    title: (tooltipItems) => `Time: ${tooltipItems[0].label}`,
                    label: (tooltipItem) => {
                        const entry = hourlyData[tooltipItem.dataIndex];
                        return [
                            `Temperature: ${tooltipItem.raw}°C`,
                            `Humidity: ${entry.humidity}%`, 
                            `Wind Speed: ${entry.wind_kph} km/h`, 
                        ];
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time of Day',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Temperature (°C)',
                },
            },
        },
    };

    return (
        <div className="w-full h-64">
            <Line data={chartData} options={options} />
        </div>
    );
}

export default WeatherGraph;
