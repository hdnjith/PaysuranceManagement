
//import 'bootstrap/dist/css/bootstrap.css';
import '../src/assets/css/bootstrap.min.css';
import '../src/assets/css/app-styles.css';
import '../src/assets/demo/demo.css';
import '../src/assets/css/mbanx-styles.css';
import '../src/assets/css/font-awesome.css';
import '../src/assets/css/font-awesome5.css';
import '../src/assets/css/left-navi.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <App />
  </BrowserRouter>,
  rootElement);

registerServiceWorker();

