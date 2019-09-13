import React from 'react';
import PropTypes from 'prop-types';
import { MapPin, Cloud, CloudSnow, CloudRain, Sun } from 'react-feather';

export default class Weather extends React.Component {
  render() {
    const status = this.props.data[2][0].status.toLowerCase();
    let gradientClassName = handleGradientClass(status);
    return (
      <div className="weather-side">
        <div className={gradientClassName}></div>
        <div className="date-container">
          <span className="date-dayname">{this.props.data[2][0].weekDay}</span>
          <br />
          <span className="date-day">{this.props.data[2][0].date}</span>
          <br />
          <span className="location">
            {this.props.data[0]}, {this.props.data[1]} <MapPin size={14} />
          </span>
        </div>
        <div className="weather-container">
          {/* RENDER WEATHER ICON ACCORDING TO STATUS*/}
          {status == 'cloudy' ? (
            <Cloud fill="white" size={80} className="icon-weather" />
          ) : status == 'sunny' ? (
            <Sun fill="white" size={80} className="icon-weather" />
          ) : status == 'rainy' ? (
            <CloudRain size={80} className="icon-weather" />
          ) : (
            <CloudSnow size={80} className="icon-weather" />
          )}
          <br />
          <span className="weather-temp">{this.props.data[2][0].currentTemp}°C</span>
          <br />
          <span className="weather-status">{this.props.data[2][0].status}</span>
        </div>
      </div>
    );
  }
}

const handleGradientClass = status => {
  const day = new Date();
  let hour = day.getHours();
  if (hour >= 19 || hour <= 5) {
    return 'gradient-night';
  }
  if (status == 'sunny') {
    return 'gradient-sunny';
  }
  return 'gradient-dark';
};

Weather.propTypes = {
  data: PropTypes.array.isRequired
};
