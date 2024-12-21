document.getElementById('searchBtn').addEventListener('click', function () {
    const city = document.getElementById('cityInput').value;
    if (city) {
        getWeatherData(city);
    } else {
        alert('Please enter a city name.');
    }
});

document.getElementById('addFavoriteBtn').addEventListener('click', function () {
    const city = document.getElementById('cityName').textContent;
    console.log('Adding to favorites:', city);  // Debugging line to check city
    addCityToFavorites(city);
});

function getWeatherData(city) {
    const apiKey = '272fb5680ef50ec778ccbeafb5d48d3d';  // Replace with your OpenWeatherMap API key
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch current weather data
    fetch(currentWeatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            if (data.weather && data.weather.length > 0) {
                // Update current weather info
                document.getElementById('cityName').textContent = data.name;
                document.getElementById('weatherCondition').textContent = data.weather[0].description;
                document.getElementById('temperature').textContent = `${data.main.temp}°C`;
                document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
                document.getElementById('humidity').textContent = `${data.main.humidity}%`;
                document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
                document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;

                const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                if (!favorites.includes(data.name)) {
                    document.getElementById('addFavoriteBtn').style.display = 'block';
                } else {
                    document.getElementById('addFavoriteBtn').style.display = 'none';
                }
            } else {
                alert('Weather data is unavailable.');
            }
        })
        .catch(err => {
            console.error(err);
            alert('Error fetching current weather data: ' + err.message);
        });

    // Fetch 5-day forecast data
    fetch(forecastUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            // Update forecast cards
            for (let i = 0; i < 5; i++) {
                const forecast = data.list[i * 8];  // Data is in 3-hour intervals, 8 intervals per day
                if (forecast && forecast.weather && forecast.weather.length > 0) {
                    document.getElementById(`forecastDay${i+1}Temp`).textContent = `${forecast.main.temp}°C`;
                    document.getElementById(`forecastDay${i+1}Low`).textContent = `${forecast.main.temp_min}°C`;
                    document.getElementById(`forecastDay${i+1}Icon`).src = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
                } else {
                    alert(`Forecast data not available for day ${i + 1}`);
                }
            }
        })
        .catch(err => {
            console.error(err);
            alert('Error fetching forecast data: ' + err.message);
        });
}

function addCityToFavorites(city) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!favorites.includes(city)) {
        favorites.push(city);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoritesList();
    }

    document.getElementById('addFavoriteBtn').style.display = 'none';
}

function removeCityFromFavorites(city) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(favCity => favCity !== city);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    updateFavoritesList();
}

function updateFavoritesList() {
    const favoritesList = document.getElementById('favoritesList');
    favoritesList.innerHTML = '';  // Clear the list

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    favorites.forEach(city => {
        const li = document.createElement('li');
        li.textContent = city;

        li.addEventListener('click', () => getWeatherData(city));

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the event from triggering the weather fetch
            removeCityFromFavorites(city);
        });

        li.appendChild(removeBtn);
        favoritesList.appendChild(li);
    });
}

// Initialize the favorites list when the page loads
document.addEventListener('DOMContentLoaded', updateFavoritesList);
