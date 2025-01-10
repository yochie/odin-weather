import "./styles.css";
import { getWeatherDataFor } from "./weather.js";

const form = document.forms[0];
const locationField = document.forms[0].location;

form.addEventListener("submit", fetchWeather);

async function fetchWeather(event) {
  event.preventDefault();
  const location = locationField.value;
  try {
    const forecast = await getWeatherDataFor(location);
    renderForecast(forecast);
    console.log(forecast);
  } catch (error) {
    console.log(error);
  }
}

function renderForecast(forecast) {
  const locationDisplay = document.querySelector(".location");
  const dateDisplay = document.querySelector(".date");
  const tempDisplay = document.querySelector(".temp");
  const conditionDisplay = document.querySelector(".condition");

  locationDisplay.textContent = forecast.location;
  dateDisplay.textContent = forecast.date;
  tempDisplay.textContent = forecast.celsiusTemp;
  conditionDisplay.textContent = forecast.condition;
}
