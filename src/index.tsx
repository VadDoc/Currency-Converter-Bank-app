import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './ui/App/App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./bll/store";
import {BrowserRouter, HashRouter} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
