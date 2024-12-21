// Define your OpenWeatherMap API key and URL
const apiKey = '272fb5680ef50ec778ccbeafb5d48d3d';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value.trim();
    
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    document.getElementById('cityName').textContent = data.name;
    document.getElementById('currentTemp').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('weatherDescription').textContent = `Description: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} km/h`;
}
