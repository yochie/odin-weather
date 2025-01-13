class Forecast {
  location;
  date;
  celsiusTemp;
  condition;
  icon;
  get fahrenheitTemp() {
    return Math.round(this.celsiusTemp * 1.8 + 32);
  }
}

async function getWeatherDataFor(location) {
  //leaking this as per course instructions
  //still feels wrong...
  const key = "QBDNC8FBJLU2R794C7WACZ7FK";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${key}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Server returned status code ${response.status}`);
  }
  const json = await response.json();
  console.log(json);
  return parseData(json);
}

function parseData(json) {
  const forecast = new Forecast();
  forecast.location = json.resolvedAddress;
  forecast.date = json.currentConditions.datetime;
  forecast.celsiusTemp = json.currentConditions.temp;
  forecast.condition = json.currentConditions.conditions;
  forecast.icon = json.currentConditions.icon;
  return forecast;
}

export { getWeatherDataFor };
