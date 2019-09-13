import React from 'react';
import Input from './location-input';
import { fetchWeatherData } from '../api/fetch-weather-data';
import { dataHandler } from '../api/handle-data.js';
import PropTypes from 'prop-types';
import { Cloud, CloudSnow, CloudRain, Sun } from 'react-feather';

export default class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: []
    };
    this.getData = this.getData.bind(this);
  }
  componentDidMount = async () => {
    let data = await fetchWeatherData('tokyo');
    let dataFormatted = dataHandler(data);
    this.setState({ weatherData: dataFormatted });
  };
  getData = data => {
    this.setState({
      weatherData: data
    });

    this.props.onSubmit(data);
  };

  render() {
    if (this.state.weatherData.length === 0) {
      return <div>Loading...</div>;
    }
    return (
      <div className="info-side">
        <div className="today-info">
          <div className="info-row">
            <span className="info-rain">RAIN PROBABILITY</span>{' '}
            <span className="info-rain-value">
              {this.state.weatherData[2][0].rainProbability}
            </span>
          </div>
          <div className="info-row">
            <span className="info-humidity">HUMIDITY</span>{' '}
            <span className="info-humidity-value">
              {this.state.weatherData[2][0].humidity}%
            </span>
          </div>
          <div className="info-row">
            <span className="info-wind">WIND</span>{' '}
            <span className="info-wind-value">
              {this.state.weatherData[2][0].windSpeed} km/h
            </span>
          </div>
        </div>
        <div className="week-container">
          {/* RENDER  5 DAYS  DATA AS A LIST*/}
          <ul className="week-list">
            <li>
              {statusIconHandler(this.state.weatherData[2][1])}
              <span className="day-name">
                {this.state.weatherData[2][1].weekDay.substring(0, 3)}
              </span>
              <span className="noon-temp">
                {' '}
                {this.state.weatherData[2][1].noonTemp}°C
              </span>
              <span className="night-temp">
                {this.state.weatherData[2][1].nightTemp}°C
              </span>
            </li>
            <li>
              {statusIconHandler(this.state.weatherData[2][2])}
              <span className="day-name">
                {' '}
                {this.state.weatherData[2][2].weekDay.substring(0, 3)}
              </span>
              <span className="noon-temp">{this.state.weatherData[2][2].noonTemp}°C</span>
              <span className="night-temp">
                {this.state.weatherData[2][2].nightTemp}°C
              </span>
            </li>
            <li>
              {statusIconHandler(this.state.weatherData[2][3])}
              <span className="day-name">
                {' '}
                {this.state.weatherData[2][3].weekDay.substring(0, 3)}
              </span>
              <span className="noon-temp">{this.state.weatherData[2][3].noonTemp}°C</span>
              <span className="night-temp">
                {this.state.weatherData[2][3].nightTemp}°C
              </span>
            </li>
            <li>
              {statusIconHandler(this.state.weatherData[2][4])}
              <span className="day-name">
                {' '}
                {this.state.weatherData[2][4].weekDay.substring(0, 3)}
              </span>
              <span className="noon-temp">{this.state.weatherData[2][4].noonTemp}°C</span>
              <span className="night-temp">
                {this.state.weatherData[2][4].nightTemp}°C
              </span>
            </li>
            <div className="clear"></div>
          </ul>
        </div>
        <div className="location-container">
          <Input onSubmit={this.getData} />
        </div>
      </div>
    );
  }
}

const statusIconHandler = data => {
  let weatherData = data.status.toLowerCase();
  if (weatherData == 'cloudy') {
    return <Cloud className="day-icon" />;
  }
  if (weatherData == 'sunny') {
    return <Sun className="day-icon" />;
  }
  if (weatherData == 'rainy') {
    return <CloudRain className="day-icon" />;
  }
  return <CloudSnow className="day-icon" />;
};

Info.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
