import React, { useState, useEffect } from 'react';
import './styles.css';

const App = () => {
  // State variables to store weather data and user input
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = '272fb5680ef50ec778ccbeafb5d48d3d'; // Replace with your OpenWeatherMap API key
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  // Function to fetch weather data based on the city
  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Effect hook to fetch weather data when city changes
  useEffect(() => {
    if (city) {
      fetchWeather();
    }
  }, [city]);

  // Handling input change and submit
  const handleInputChange = (e) => setCity(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="weather-dashboard">
      <h1>Weather Dashboard</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default App;
