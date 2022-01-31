import {action, makeObservable, observable} from "mobx";
import {Navigate} from "react-router-dom";

export class LoginStore{
    @observable
    usuario: string = '';

    @observable
    token: string = '';


    constructor(){
        makeObservable(this);
    }

    @action.bound
    actualizarCredenciales(token: string, usuario: string){
        this.usuario = usuario;
        this.token = token;
    }
}

export const loginStore = new LoginStore();
