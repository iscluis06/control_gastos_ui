import {Component, useContext} from "react";
import {LoginContext} from "../context/LoginContext";
import {Navigate} from "react-router-dom";

export const ComponenteProtegido = () => {
        const {store} = useContext(LoginContext);
        return (<>{(store.token === null || store.token == '' ? <Navigate to='/' /> : '')}</>);
}
