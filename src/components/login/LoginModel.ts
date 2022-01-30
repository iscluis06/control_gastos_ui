import { makeObservable, observable, action } from 'mobx';
import {ChangeEvent, MouseEventHandler} from "react";
import {FormControlElement} from '../../GlobalTypes';
import {encode} from 'base-64';

export default class LoginModel{
    @observable
    usuario: string = '';

    @observable
    contrasena: string = '';

    constructor() {
        makeObservable(this);
    }

    @action.bound
    async iniciarSesion(){
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + encode(this.usuario + ":" + this.contrasena));
        headers.set("Content-Type", "application/json");
        const result = await fetch("http://127.0.0.1:8000/control_gastos/cuentas/count/1", {headers: headers});
        console.dir(result);
    }

    @action.bound
    actualizarUsuario(event: ChangeEvent<FormControlElement>){
        this.usuario = event.target.value;
    }

    @action.bound
    actualizarContrasena(event: ChangeEvent<FormControlElement>){
        this.contrasena = event.target.value;
    }
}
