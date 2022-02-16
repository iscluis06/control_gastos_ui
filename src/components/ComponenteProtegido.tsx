import {Navigate} from "react-router-dom";
import {requestLogic} from "../RequestLogic";
import {observer} from "mobx-react";

export const ComponenteProtegido = observer(() => {
        const token = localStorage.getItem("token");
        const usuario = localStorage.getItem("usuario");
        if(token != undefined && usuario != undefined){
                requestLogic.actualizarCredenciales(token, usuario);
        }

        return (<>{(requestLogic.token === null || requestLogic.token == '' ? <Navigate to='/' /> : '')}</>);
});
