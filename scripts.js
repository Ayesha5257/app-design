document.addEventListener('DOMContentLoaded', function () {
    const inputBox = document.querySelector('.input-box');
    const searchBtn = document.getElementById('searchBtn');
    const weather_img = document.querySelector('.weather_img');
    const temperature = document.querySelector('.temperature');
    const description = document.querySelector('.description');
    const humidity = document.querySelector('#humidity');
    const wind_speed = document.querySelector('#wind-speed');
    const location_not_found = document.querySelector('.location-not-found');
    const weather_body = document.querySelector('.weather-body');

    async function checkWeather(city) {
        const api_key = "f8112a7fd35112641b6e22c628b752cc"; // OpenWeatherMap API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

        try {
            const weather_data = await fetch(url).then(response => response.json());

            // Log weather data to console for debugging
            console.log(weather_data);

            // Check if city is found (status code 404 means city not found)
            if (weather_data.cod === `404`) {
                location_not_found.style.display = "flex";
                weather_body.style.display = "none";
                console.log("City not found");
                return;
            }
            weather_body.style.display = "none";
            weather_body.style.display = "flex";
            // Convert temperature from Kelvin to Celsius
            const tempCelsius = Math.round(weather_data.main.temp - 273.15);
            // Update weather details in HTML
            temperature.innerHTML = `${tempCelsius}°C`; // Temperature in Celsius
            description.innerHTML = `${weather_data.weather[0].description}`; // Weather description
            humidity.innerHTML = `${weather_data.main.humidity}%`; // Humidity percentage
            wind_speed.innerHTML = `${weather_data.wind.speed} KM/h`; // Wind speed in KM/h

            // Switch image based on weather condition
            const weatherCondition = weather_data.weather[0].main.toLowerCase();

            switch (weatherCondition) {
                case 'clouds':
                    weather_img.src = "/assets/cloud.png"; // Cloudy weather
                    break;
                case 'clear':
                    weather_img.src = "/assets/clear.png"; // Clear weather
                    break;
                case 'rain':
                    weather_img.src = "/assets/rain.png"; // Rainy weather
                    break;
                case 'mist':
                    weather_img.src = "/assets/mist.png"; // Misty weather
                    break;
                case 'snow':
                    weather_img.src = "/assets/snow.png"; // Snowy weather
                    break;
            }

        } catch (error) {
            console.error("Error fetching weather data:", error);
            alert("Failed to fetch weather data.");
        }
    }

    searchBtn.addEventListener('click', () => {
        const city = inputBox.value.trim();
        if (city) {
            checkWeather(city); // Fetch weather data for the entered city
        } else {
            alert("Please enter a city name.");
        }
    });
});





