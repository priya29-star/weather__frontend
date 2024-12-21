// WeatherDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherDashboard = ({ token }) => {
  const [forecast, setForecast] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/weather/forecast', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForecast(response.data.forecast);
      } catch (err) {
        console.error('Failed to fetch weather data', err);
      }
    };

    if (token) {
      fetchWeather();
    }
  }, [token]);

  return <div>{forecast ? forecast : 'Loading weather data...'}</div>;
};

export default WeatherDashboard;
