import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { fetchData } from './components/fetch-data.js';

fetchData();
ReactDOM.render(<App />, document.getElementById('root'));
