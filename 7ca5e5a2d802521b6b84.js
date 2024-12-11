import { apiKey } from "./api";
import "./styles.css";

document.getElementById("searchBtn").addEventListener("click", getWeather);

async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
  if (city === '') {
    alert('Please enter a city name.');
    return;
  }

  if (!isValidCityName(city)) {
    alert('Please enter a valid city name (letters and spaces only).');
    return;
  }

  const weatherDiv = document.getElementById('weatherInfo');
  weatherDiv.innerHTML = '<p>Loading...</p>';
  
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);

    if(!response.ok) {
        throw new Error ("City not found!");
    }
    const data = await response.json();

    displayWeather(data);
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      displayError('Network error. Please check your internet connection.');
    } else {
      displayError(error.message);
    }
  }
}

function displayWeather(data) {
    document.getElementById('cityInput').value = ''; // Clear input

    const weatherDiv = document.getElementById("weatherInfo");
    weatherDiv.innerHTML = `<h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
    <p><strong>Weather:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>`;
}

function displayError(message) {
    const weatherDiv = document.getElementById("weatherInfo");
    weatherDiv.innerHTML = `<p style="color:red;">Error: ${message}</p>`;
}

function isValidCityName(city) {
    const cityRegex = /^[a-zA-Z\s]+$/;
  return cityRegex.test(city);
}