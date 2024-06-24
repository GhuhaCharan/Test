const apiKey = 'YOUR_API_KEY';  // Replace with your OpenWeatherMap API key

async function getWeather() {
    const location = document.getElementById('location').value;
    if (!location) {
        alert('Please enter a location');
        return;
    }
    
    try {
        const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        const currentWeatherData = await currentWeatherResponse.json();
        displayCurrentWeather(currentWeatherData);
        
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&cnt=7&appid=${apiKey}&units=metric`);
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);
    } catch (error) {
        alert('Error fetching weather data');
        console.error(error);
    }
}

function displayCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('current-weather-data');
    currentWeatherDiv.innerHTML = `
        <p>Location: ${data.name}, ${data.sys.country}</p>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function displayForecast(data) {
    const forecastDiv = document.getElementById('forecast-data');
    forecastDiv.innerHTML = data.list.map(day => `
        <div>
            <p>Date: ${new Date(day.dt * 1000).toLocaleDateString()}</p>
            <p>Temperature: ${day.temp.day} °C</p>
            <p>Weather: ${day.weather[0].description}</p>
            <p>Humidity: ${day.humidity}%</p>
        </div>
    `).join('');
}
