export const dataHandler = data => {
  const day = new Date();
  const dayCode = day.getDay();
  const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  let cityName = data[0].city.name;
  let countryCode = data[0].city.country;
  let currentDate = getFormattedDate();
  let currentTime = data[0].list[0].dt_txt.split(' ')[1].split(':')[0];
  // calculate the array distance between current data and next day data
  // weather data from api contains data of 3h periods
  let difference = (24 - currentTime) / 3 + 4;
  if (difference === 12) {
    difference = 11;
  }
  const dataFactored = [
    {
      day: 1,
      weekDay: weekDays[dayCode % 7],
      currentTemp: parseInt(data[1].main.temp - 273.15, 10),
      status: getFormattedStatus(data[1].weather[0].main),
      humidity: data[1].main.humidity,
      windSpeed: data[1].wind.speed,
      rainProbability: calcRainProb(data[1], data[1].weather[0].main),
      date: currentDate
    },
    {
      day: 2,
      weekDay: weekDays[(dayCode + 1) % 7],
      noonTemp: parseInt(data[0].list[difference].main.temp - 273.15, 10),
      nightTemp: parseInt(data[0].list[difference + 4].main.temp - 273.15, 10),
      status: getFormattedStatus(data[0].list[difference].weather[0].main),
      humidity: data[0].list[difference].main.humidity,
      windSpeed: data[0].list[difference].wind.speed,
      rainProbability: calcRainProb(
        data[0].list[difference],
        data[0].list[difference].weather[0].main
      )
    },
    {
      day: 3,
      weekDay: weekDays[(dayCode + 2) % 7],
      noonTemp: parseInt(data[0].list[difference + 8].main.temp - 273.15, 10),
      nightTemp: parseInt(data[0].list[difference + 12].main.temp - 273.15, 10),
      status: getFormattedStatus(data[0].list[difference + 8].weather[0].main),
      humidity: data[0].list[difference + 8].main.humidity,
      windSpeed: data[0].list[difference + 8].wind.speed,
      rainProbability: calcRainProb(
        data[0].list[difference + 8],
        data[0].list[difference + 8].weather[0].main
      )
    },
    {
      day: 4,
      weekDay: weekDays[(dayCode + 3) % 7],
      noonTemp: parseInt(data[0].list[difference + 16].main.temp - 273.15, 10),
      nightTemp: parseInt(data[0].list[difference + 20].main.temp - 273.15, 10),
      status: getFormattedStatus(data[0].list[difference + 16].weather[0].main),
      humidity: data[0].list[difference + 16].main.humidity,
      windSpeed: data[0].list[difference + 16].wind.speed,
      rainProbability: calcRainProb(
        data[0].list[difference + 16],
        data[0].list[difference + 16].weather[0].main
      )
    },
    {
      day: 5,
      weekDay: weekDays[(dayCode + 4) % 7],
      noonTemp: parseInt(data[0].list[difference + 24].main.temp - 273.15, 10),
      nightTemp: parseInt(data[0].list[difference + 28].main.temp - 273.15, 10),
      status: getFormattedStatus(data[0].list[difference + 24].weather[0].main),
      humidity: data[0].list[difference + 24].main.humidity,
      windSpeed: data[0].list[difference + 24].wind.speed,
      rainProbability: calcRainProb(
        data[0].list[difference + 24],
        data[0].list[difference + 24].weather[0].main
      )
    }
  ];
  return [cityName, countryCode, dataFactored];
};

const calcRainProb = (dataList, status) => {
  let cloud = dataList.clouds.all;
  return status === 'Rain' && cloud >= 25 ? 'High' : 'Low';
};

const getFormattedDate = () => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  let date = new Date();
  let year = date.getFullYear();
  let month = monthNames[date.getMonth()];
  let day = date.getDate();

  return day + ' ' + month.substring(0, 3) + ' ' + year;
};

const getFormattedStatus = status => {
  let currentStatus = status.toLowerCase();

  if (currentStatus == 'rain') {
    return 'Rainy';
  }
  if (currentStatus == 'clouds') {
    return 'Cloudy';
  }
  if (currentStatus == 'clear') {
    return 'Sunny';
  }
  if (currentStatus == 'mist') {
    return 'Misty';
  }
  if (currentStatus == 'extreme') {
    return 'Extreme';
  }
  return status;
};
