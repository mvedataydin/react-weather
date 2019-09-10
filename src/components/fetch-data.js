export const fetchData = async () => {
  let cityName = 'adana';
  let countryCode = 'tr';

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=4a12e1a24af4c1c3362bdec84315696c`,
    { mode: 'cors' }
  );

  const weatherData = await response.json();
  console.log(weatherData);
  console.log(weatherData.city.country);
};
