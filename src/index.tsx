import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import LoginView from "./components/login/LoginView";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginModel from "./components/login/LoginModel";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Provider } from 'mobx-react';
import {loginStore} from "./stores/LoginStore";
import PanelControlView from "./components/panel_control/PanelControlView";
import PanelControlModel from "./components/panel_control/PanelControlModel";


ReactDOM.render(
  <React.StrictMode>
      <Provider store={loginStore}>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<LoginView viewModel={new LoginModel()} />} />
                  <Route path="/panel_control" element={<PanelControlView viewModel={new PanelControlModel()} />} />
              </Routes>
          </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
