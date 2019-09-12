import React from 'react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ReactDOM from 'react-dom';
import App from './App.js';
import { fetchWeatherData } from './api/fetch-weather-data.js';
import { dataHandler } from './api/handle-data.js';

// const operate = async () => {
//   let weatherData = await fetchWeatherData('adana');
//   let faca = dataHandler(weatherData);
//   console.log(weatherData);
//   console.log(faca);
// };
ReactDOM.render(<App />, document.getElementById('root'));
