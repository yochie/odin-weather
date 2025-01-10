class Forecast {
  location;
  date;
  celsiusTemp;
  condition;
}

async function getWeatherDataFor(location) {
  //leaking this as per course instructions
  //still feels wrong...
  const key = "QBDNC8FBJLU2R794C7WACZ7FK";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${key}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Invalid status code");
  }
  const json = await response.json();
  console.log(json);
  return parseData(json);
}

function parseData(json) {
  const forecast = new Forecast();
  forecast.location = json.address;
  forecast.date = json.days[0].datetime;
  forecast.celsiusTemp = json.days[0].temp;
  forecast.condition = json.days[0].conditions;
  return forecast;
}

export { getWeatherDataFor };
