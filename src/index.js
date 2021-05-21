import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Head from './Head';
import Foot from './Foot';

ReactDOM.render(
  <React.StrictMode>
    <Head />
    <App />
    <Foot />
  </React.StrictMode>,
  document.getElementById('root')
);

