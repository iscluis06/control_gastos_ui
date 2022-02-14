import {makeObservable, observable, action} from 'mobx';
import {ChangeEvent} from "react";
import {FormControlElement} from '../../GlobalTypes';
import {requestLogic} from "../../RequestLogic";

export default class LoginStore {
    @observable
    usuario: string = '';

    @observable
    contrasena: string = '';

    @observable
    error: boolean = false;

    constructor() {
        makeObservable(this);
    }

    @action.bound
    actualizarError(error: boolean) {
        this.error = error;
    }

    @action.bound
    actualizarUsuario(event: ChangeEvent<FormControlElement>) {
        this.usuario = event.target.value;
    }

    @action.bound
    actualizarContrasena(event: ChangeEvent<FormControlElement>) {
        this.contrasena = event.target.value;
    }

    @action.bound
    async iniciarSesion() {
        this.actualizarError(await requestLogic.obtenerToken(this.usuario, this.contrasena));
    }
}
