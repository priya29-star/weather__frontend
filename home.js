// Define your OpenWeatherMap API key and URL
const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value.trim();
    
    if (city) {
        getWeather(city); // Fetch weather for the entered city
    }
});

// Function to fetch weather data from OpenWeatherMap API
async function getWeather(city) {
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`; // Use metric units for Celsius temperature

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found or invalid API request');
        }
        const data = await response.json();
        displayWeather(data); // Display weather data
    } catch (error) {
        alert(error.message); // Handle errors (e.g., city not found)
    }
}

// Function to update the UI with weather data
function displayWeather(data) {
    // Extracting weather data from the response
    const cityName = data.name;
    const temp = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    // Update the HTML elements with the fetched data
    document.getElementById('cityName').textContent = cityName;
    document.getElementById('currentTemp').textContent = `Temperature: ${temp}°C`;
    document.getElementById('weatherDescription').textContent = `Description: ${description}`;
    document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
    document.getElementById('windSpeed').textContent = `Wind Speed: ${windSpeed} km/h`;
    
    // Optionally, you can also change the background or add icons based on the weather conditions
    updateWeatherIcon(description);
}

// Function to update the weather icon based on the description
function updateWeatherIcon(description) {
    const iconElement = document.getElementById('weatherIcon');
    if (description.includes("clear")) {
        iconElement.innerHTML = '<i class="fas fa-sun"></i>'; // Sunny icon
    } else if (description.includes("clouds")) {
        iconElement.innerHTML = '<i class="fas fa-cloud"></i>'; // Cloudy icon
    } else if (description.includes("rain")) {
        iconElement.innerHTML = '<i class="fas fa-cloud-showers-heavy"></i>'; // Rainy icon
    } else if (description.includes("snow")) {
        iconElement.innerHTML = '<i class="fas fa-snowflake"></i>'; // Snowy icon
    } else {
        iconElement.innerHTML = '<i class="fas fa-smog"></i>'; // Default icon
    }
}
