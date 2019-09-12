import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Weather extends React.Component {
  render() {
    return (
      <div className="weather-side">
        <div className="weather-gradient"></div>
        <div className="date-container">
          <h2 className="date-dayname">{this.props.data[2][0].weekDay}</h2>
          <span className="date-day">{this.props.data[2][0].date}</span>
          <i className="location-icon" data-feather="map-pin"></i>
          <span className="location">
            {this.props.data[0]}, {this.props.data[1]}
          </span>
        </div>
        <div className="weather-container">
          <i className="weather-icon" data-feather="sun"></i>
          <h1 className="weather-temp">{this.props.data[2][0].currentTemp}°C</h1>
          <h3 className="weather-desc">{this.props.data[2][0].status}</h3>
        </div>
      </div>
    );
  }
}

Weather.propTypes = {
  data: PropTypes.array.isRequired
};
