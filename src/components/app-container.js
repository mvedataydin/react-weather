import React from 'react';
import ReactDOM from 'react-dom';
import Weather from './weather';
import Info from './info';
import { fetchWeatherData } from '../api/fetch-weather-data';
import { dataHandler } from '../api/handle-data.js';

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: []
    };
  }
  componentDidMount = async () => {
    let data = await fetchWeatherData('adana');
    let dataFormatted = dataHandler(data);
    this.setState({ weatherData: dataFormatted });
  };
  getData = data => {
    this.setState({ weatherData: data });
  };

  render() {
    if (this.state.weatherData.length === 0) {
      return <div>Loading...</div>;
    }
    return (
      <div className="container">
        <Weather data={this.state.weatherData} />
        <Info onSubmit={this.getData} />
      </div>
    );
  }
}
