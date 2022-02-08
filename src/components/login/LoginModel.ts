import { makeObservable, observable, action } from 'mobx';
import {ChangeEvent} from "react";
import {FormControlElement} from '../../GlobalTypes';
import {encode} from 'base-64';
import RequestLogic from "../../utils/RequestLogic";

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
            const requestLogic = new RequestLogic();
            const resultadoJSON = await requestLogic.obtenerToken(this.usuario, this.contrasena);
            if(resultadoJSON.token == undefined){
                this.error = true;
                return;
            }
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
