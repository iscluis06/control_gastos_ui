import {makeObservable, observable, action} from 'mobx';
import {ChangeEvent} from "react";
import {FormControlElement} from '../../GlobalTypes';
import {requestLogic} from "../../RequestLogic";

export default class LoginStore {
    usuario: string = '';
    contrasena: string = '';
    error: boolean = false;

    constructor() {
        makeObservable(this, {
            usuario: observable,
            contrasena: observable,
            error: observable,
            actualizarError: action.bound,
            actualizarUsuario: action.bound,
            actualizarContrasena: action.bound,
            iniciarSesion: action.bound,
        });
    }

    actualizarError(error: boolean) {
        this.error = error;
    }

    actualizarUsuario(event: ChangeEvent<FormControlElement>) {
        this.usuario = event.target.value;
    }

    actualizarContrasena(event: ChangeEvent<FormControlElement>) {
        this.contrasena = event.target.value;
    }

    async iniciarSesion() {
        this.actualizarError(await requestLogic.obtenerToken(this.usuario, this.contrasena));
    }
}
