import React, { useState } from 'react';
import { FaSun, FaCloud, FaCloudSun, FaCloudRain, FaSnowflake, FaBolt, FaSmog, FaAngleDown, FaTint, FaWind } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

const WeatherHistoryTable = ({ historicalData }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  // Map weather conditions to icons
  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return <FaSun className="text-yellow-500" />;
      case 'cloudy':
        return <FaCloud className="text-gray-500" />;
      case 'partly cloudy':
        return <FaCloudSun className="text-yellow-300" />;
      case 'rain':
        return <FaCloudRain className="text-blue-500" />;
      case 'snow':
        return <FaSnowflake className="text-blue-200" />;
      case 'thunderstorm':
        return <FaBolt className="text-yellow-700" />;
      case 'fog':
      case 'mist':
        return <FaSmog className="text-gray-600" />;
      default:
        return <FaCloud className="text-gray-400" />;
    }
  };

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index); //Toggle row expansion
  };

  
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options); 
  };

  return (
    <div className="mt-6 w-full">
      <h3 className="text-lg font-bold mb-4">Weather Table</h3>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Condition</th>
            <th className="py-3 px-6 text-left">Temperature</th>
            <th className="py-3 px-6 text-left">Details</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {historicalData?.forecast?.forecastday?.map((day, index) => (
            <React.Fragment key={index}>
              <tr
                className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(index)}
              >
                <td className="py-3 px-6 text-left">
                  {formatDate(day.date)} 
                </td>
                <td className="py-3 px-6 text-left flex items-center">
                  {getWeatherIcon(day.day.condition.text)} 
                  <span className="ml-2">{day.day.condition.text}</span>
                </td>
                <td className="py-3 px-6 text-left">
                  {day.day.maxtemp_c}°C / {day.day.mintemp_c}°C
                </td>
                <td className="py-3 px-6 text-left">
                  <button className="text-gray-600 hover:text-gray-900">
                    <FaAngleDown
                      className={`transform transition-transform duration-300 ${expandedRow === index ? 'rotate-180' : ''}`}
                      style={{ fontSize: '18px' }} 
                    />
                  </button>
                </td>
              </tr>

              {/* Expanded row with more detailed information */}
              {expandedRow === index && (
                <tr
                  className="bg-gray-50"
                  style={{
                    transition: 'all 0.3s ease-in-out', 
                  }}
                >
                  <td colSpan="4" className="p-4">
                    <div className="grid grid-cols-2 gap-4 text-gray-800">
                      {/* Two items per row */}
                      <div className="flex items-center">
                        <FaTint className="mr-2 text-blue-500" />
                        <p><strong>Humidity:</strong> {day.day.avghumidity}%</p>
                      </div>
                      <div className="flex items-center">
                        <FaWind className="mr-2 text-gray-600" />
                        <p><strong>Wind Speed:</strong> {day.day.maxwind_kph} km/h</p>
                      </div>
                      <div className="flex items-center">
                        <FaSun className="mr-2 text-yellow-500" />
                        <p><strong>UV Index:</strong> {day.day.uv}</p>
                      </div>
                      <div className="flex items-center">
                        <FaSun className="mr-2 text-orange-500" />
                        <p><strong>Sunrise:</strong> {day.astro.sunrise}</p>
                      </div>
                      <div className="flex items-center">
                        <FaSun className="mr-2 text-red-500" />
                        <p><strong>Sunset:</strong> {day.astro.sunset}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherHistoryTable;
