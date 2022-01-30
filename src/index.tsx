import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import LoginView from "./components/login/LoginView";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginModel from "./components/login/LoginModel";


ReactDOM.render(
  <React.StrictMode>
    <LoginView viewModel={new LoginModel()} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
