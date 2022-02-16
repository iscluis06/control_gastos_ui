import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {LoginView} from "./components/login/LoginView";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginStore from "./components/login/LoginStore";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {PanelControlView} from "./components/panel_control/PanelControlView";
import {CuentasView} from "./components/cuentas/CuentasView";
import {CategoriaView} from "./components/categoria/CategoriaView";
import {SubcategoriaView} from "./components/subcategoria/SubcategoriaView";
import {TransaccionesView} from "./components/transacciones/TransaccionesView";


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginView store={new LoginStore()}/>}/>
                <Route path="/panel_control" element={<PanelControlView/>}/>
                <Route path="/cuentas" element={<CuentasView/>}/>
                <Route path="/categorias" element={<CategoriaView/>}/>
                <Route path="/subcategorias" element={<SubcategoriaView/>}/>
                <Route path="/transacciones" element={<TransaccionesView/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
