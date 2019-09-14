export const fetchWeatherData = async cityName => {
  //FETCH 5 DAY / 3HOURS FORECAST DATA
  const responseForecast = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=4a12e1a24af4c1c3362bdec84315696c`,
    { mode: 'cors' }
  );
  const forecastData = await responseForecast.json();
  //FETCH CURRENT WEATHER DATA
  const responseWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4a12e1a24af4c1c3362bdec84315696c`,
    { mode: 'cors' }
  );
  const weatherData = await responseWeather.json();
  console.log(forecastData);
  console.log(weatherData);
  return [forecastData, weatherData];
};
