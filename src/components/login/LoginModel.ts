import { makeObservable, observable, action } from 'mobx';
import {ChangeEvent, MouseEventHandler} from "react";
import {FormControlElement} from '../../GlobalTypes';
import {encode} from 'base-64';

export default class LoginModel{
    @observable
    usuario: string = '';

    @observable
    contrasena: string = '';

    @observable
    error: boolean = false;

    @observable
    loginFunction: (token: string, usuario: string) => void = (token, usuario) => {};

    constructor() {
        makeObservable(this);
    }

    @action.bound
    actualizarLoginFunction(loginFunction: (token: string, usuario: string) => void){
        this.loginFunction = loginFunction;
    }

    @action.bound
    async iniciarSesion(){
        try {
            let headers = new Headers();
            headers.set('Authorization', 'Basic ' + encode(this.usuario + ":" + this.contrasena));
            headers.set("Content-Type", "application/json");
            const result = await fetch("http://127.0.0.1:8000/api-token-auth/", {
                headers: headers,
                method: "POST",
                body: JSON.stringify({"username": this.usuario, "password": this.contrasena})
            });
            const resultadoJSON = await result.json();
            this.loginFunction(resultadoJSON.token, this.usuario);
        }catch (Exception){
            console.log(Exception);
            this.error = true;
        }
    }

     @action.bound
     reiniciarError(){
        this.error = !this.error
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
