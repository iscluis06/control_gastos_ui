import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import LoginView from "./components/login/LoginView";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginModel from "./components/login/LoginModel";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginContextProvider from "./context/LoginContextProvider";
import Test from "./components/test/test";
import TestModel from "./components/test/testModel";
import {PanelControlView} from "./components/panel_control/PanelControlView";


ReactDOM.render(
    <React.StrictMode>
        <LoginContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginView viewModel={new LoginModel()}/>}/>
                    <Route path="/test" element={<LoginContextProvider><Test
                        viewModel={new TestModel()}/></LoginContextProvider>}/>
                    <Route path="/panel_control"
                           element={<PanelControlView/>}/>
                </Routes>
            </BrowserRouter>
        </LoginContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
