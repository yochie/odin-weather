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
  const resultDisplay = document.querySelector(".result-wrapper");
  const locationDisplay = document.querySelector(".location");
  const tempCelsiusDisplay = document.querySelector(".celsius");
  const tempFahrenheitDisplay = document.querySelector(".fahrenheit");
  const conditionDisplay = document.querySelector(".condition");
  const iconDisplay = document.querySelector(".icon");

  resultDisplay.style.display = "block";
  locationDisplay.textContent = forecast.location;
  tempCelsiusDisplay.textContent = `${forecast.celsiusTemp} °C`;
  tempFahrenheitDisplay.textContent = `${forecast.fahrenheitTemp} °F`;
  conditionDisplay.textContent = forecast.condition;
  import(`./icons/${forecast.icon}.svg`).then((module) => {
    iconDisplay.src = module.default;
  });
}

function toggleUnits(units) {
  const tempDisplay = document.querySelector(".temp");
  for (const child of tempDisplay.children) {
    if (child.classList.contains(units)) {
      child.style.display = "block";
    } else {
      child.style.display = "none";
    }
  }
}

const unitToggle = document.querySelector("fieldset.unit-toggle");
unitToggle.addEventListener("change", () => {
  const checked = document.querySelector('input[name="units"]:checked');
  toggleUnits(checked.value);
});
