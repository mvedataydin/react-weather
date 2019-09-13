import React from 'react';
import PropTypes from 'prop-types';
import { fetchWeatherData } from '../api/fetch-weather-data';
import { dataHandler } from '../api/handle-data.js';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    let cityName = this.state.city;
    event.preventDefault();
    if (this.state.city === '') {
      return null;
    }
    let data = await fetchWeatherData(cityName);
    let dataFormatted = dataHandler(data);
    this.props.onSubmit(dataFormatted);
    this.setState({
      city: ''
    });
  };
  render() {
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <input
            className="location-input"
            autoComplete="off"
            type="text"
            value={this.state.city}
            name="city"
            onChange={this.handleChange}
            placeholder="Change Location"
            onFocus={e => (e.target.placeholder = '')}
            onBlur={e => (e.target.placeholder = 'Change Location')}
          />
        </form>
      </div>
    );
  }
}

Input.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
