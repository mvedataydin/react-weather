import React from 'react';
import ReactDOM from 'react-dom';
import Input from './location-input';
import { fetchWeatherData } from '../api/fetch-weather-data';
import { dataHandler } from '../api/handle-data.js';
import PropTypes from 'prop-types';

export default class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: []
    };
    this.getData = this.getData.bind(this);
  }
  componentDidMount = async () => {
    let data = await fetchWeatherData('seattle');
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
      <div>
        <h2>Hello from Info</h2>
        <div className="today-info">
          <div>
            <span>Rain probability</span>{' '}
            <span>{this.state.weatherData[2][0].rainProbability}</span>
          </div>
          <div>
            <span>Humidity</span> <span>{this.state.weatherData[2][0].humidity}</span>
          </div>
          <div>
            <span>wind</span> <span>{this.state.weatherData[2][0].windSpeed} km/h</span>
          </div>
        </div>
        <div className="week-container">
          {/* RENDER  5 DAYS  DATA AS A LIST*/}
          <ul className="week-list">
            <li className="active">
              <i className="day-icon" data-feather="sun"></i>
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
              <i className="day-icon" data-feather="cloud"></i>
              <span className="day-name">
                {' '}
                {this.state.weatherData[2][2].weekDay.substring(0, 3)}
              </span>
              <span className="noon-temp">{this.state.weatherData[2][2].noonTemp}°C</span>
              <span className="night-temp">
                {this.state.weatherData[2][2].nightTemp}°C°C
              </span>
            </li>
            <li>
              <i className="day-icon" data-feather="cloud-snow"></i>
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
              <i className="day-icon" data-feather="cloud-rain"></i>
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
        <Input onSubmit={this.getData} />
      </div>
    );
  }
}

Info.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
