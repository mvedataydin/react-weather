import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { fetchData } from './api/fetch-data.js';
import { dataHandler } from './api/handle-data.js';

const operate = async () => {
  let data = await fetchData('adana');
  let faca = dataHandler(data);
  console.log(data);
  console.log(faca);
};
operate();

ReactDOM.render(<App />, document.getElementById('root'));
