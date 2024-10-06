window.addEventListener("load", () => {
    let lon;
    let lat;
    let apiKey = "*paste your Weatherbit api key here";
    let cityName = document.querySelector(".city");
    let temperatureValue = document.querySelector(".value");
    let temperatureDescription = document.querySelector(".description");
    let sunRise = document.querySelector(".sun-rise");
    let sunSet = document.querySelector(".sun-set");
    let weatherIcon = document.querySelector(".weather-icon-img");
    let searchBar = document.querySelector(".search-bar");
    let searchButton = document.querySelector(".search-button");
    let container = document.querySelector(".container");

    function getWeather(api) {
        fetch(api)
            .then(response => response.json())
            .then(data => {
                const { timezone, temp, sunrise, sunset } = data.data[0];
                const { description, icon, code } = data.data[0].weather;

                cityName.textContent = "Location: " + timezone;
                temperatureValue.textContent = "Temperature: " + Math.floor(temp) + "°C";
                temperatureDescription.textContent = "Weather Forecast: " + description;
                sunRise.textContent = "Sunrise: " + sunrise;
                sunSet.textContent = "Sunset: " + sunset;
                weatherIcon.src = `https://cdn.weatherbit.io/static/img/icons/${icon}.png`;

                
                setWeatherBackground(code);
            });
    }

    function setWeatherBackground(weatherCode) {
        if (weatherCode >= 200 && weatherCode < 300) {
            container.style.backgroundImage = "url('thunderstorm.gif')";
        } else if (weatherCode >= 300 && weatherCode < 600) {
            container.style.backgroundImage = "url('lightrain.gif')";
        } else if (weatherCode >= 600 && weatherCode < 700) {
            container.style.backgroundImage = "url('snow.gif')";
        } else if (weatherCode >= 700 && weatherCode < 800) {
            container.style.backgroundImage = "url('fog.gif')";
        } else if (weatherCode === 800) {
            container.style.backgroundImage = "url('clearsky.gif')";
        } else if (weatherCode > 800) {
            container.style.backgroundImage = "url('cloudy.gif')";
        }
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}&lang=eng`;
            getWeather(api);
        });
    }

 
    searchButton.addEventListener("click", () => {
        const city = searchBar.value;
        if (city) {
            const api = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}&lang=eng`;
            getWeather(api);
        }
    });
});
