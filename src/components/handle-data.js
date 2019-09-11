export const dataHandler = weatherData => {
  const day = new Date();
  const dayCode = day.getDay();

  const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Fri',
    'Saturday'
  ];
  let cityName = weatherData.city.name;
  let countryCode = weatherData.city.country;

  let currentTime = weatherData.list[0].dt_txt
    .split(' ')[1]
    .split(':')[0];
  // calculate the array distance between current data and next day data
  // weather data from api contains data of 3h periods
  let difference = (24 - currentTime) / 3 + 4;

  const data = [
    {
      day: 1,
      weekDay: weekDays[dayCode],
      currentTemp: parseInt(
        weatherData.list[0].main.temp - 273.15,
        10
      ),
      status: weatherData.list[0].weather[0].main,
      humidity: weatherData.list[0].main.humidity,
      windSpeed: weatherData.list[0].wind.speed,
      rainProbability: calcRainProb(
        weatherData.list[0],
        weatherData.list[0].weather[0].main
      )
    },
    {
      day: 2,
      weekDay: weekDays[dayCode + 1],
      noonTemp: parseInt(
        weatherData.list[difference].main.temp - 273.15,
        10
      ),
      nightTemp: parseInt(
        weatherData.list[difference + 4].main.temp - 273.15,
        10
      ),
      status: weatherData.list[difference].weather[0].main,
      humidity: weatherData.list[difference].main.humidity,
      windSpeed: weatherData.list[difference].wind.speed,
      rainProbability: calcRainProb(
        weatherData.list[difference],
        weatherData.list[difference].weather[0].main
      )
    },
    {
      day: 3,
      weekDay: weekDays[dayCode + 2],
      noonTemp: parseInt(
        weatherData.list[difference + 8].main.temp - 273.15,
        10
      ),
      nightTemp: parseInt(
        weatherData.list[difference + 12].main.temp - 273.15,
        10
      ),
      status: weatherData.list[difference + 8].weather[0].main,
      humidity: weatherData.list[difference + 8].main.humidity,
      windSpeed: weatherData.list[difference + 8].wind.speed,
      rainProbability: calcRainProb(
        weatherData.list[difference + 8],
        weatherData.list[difference + 8].weather[0].main
      )
    },
    {
      day: 4,
      weekDay: weekDays[dayCode + 3],
      noonTemp: parseInt(
        weatherData.list[difference + 16].main.temp - 273.15,
        10
      ),
      nightTemp: parseInt(
        weatherData.list[difference + 20].main.temp - 273.15,
        10
      ),
      status: weatherData.list[difference + 16].weather[0].main,
      humidity: weatherData.list[difference + 16].main.humidity,
      windSpeed: weatherData.list[difference + 16].wind.speed,
      rainProbability: calcRainProb(
        weatherData.list[difference + 16],
        weatherData.list[difference + 16].weather[0].main
      )
    },
    {
      day: 5,
      weekDay: weekDays[dayCode + 3],
      noonTemp: parseInt(
        weatherData.list[difference + 24].main.temp - 273.15,
        10
      ),
      nightTemp: parseInt(
        weatherData.list[difference + 28].main.temp - 273.15,
        10
      ),
      status: weatherData.list[difference + 24].weather[0].main,
      humidity: weatherData.list[difference + 24].main.humidity,
      windSpeed: weatherData.list[difference + 24].wind.speed,
      rainProbability: calcRainProb(
        weatherData.list[difference + 24],
        weatherData.list[difference + 24].weather[0].main
      )
    }
  ];
  console.log(data);
  return [cityName, countryCode, data];
};

const calcRainProb = (dataList, status) => {
  let cloud = dataList.clouds.all;
  return status === 'Rain' && cloud >= 25
    ? 'Highly probable'
    : 'Unlikely';
};
