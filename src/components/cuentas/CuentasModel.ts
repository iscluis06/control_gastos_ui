import {makeObservable, observable, computed, action} from "mobx";
import {Cuenta, CuentaResponse} from "./Types";
import {LoginStore} from "../../stores/LoginStore";
import RequestLogic from "../../utils/RequestLogic";

export default class CuentasModel{
    @observable
    listaResultados: Cuenta[] = [];

    @observable
    loading: boolean = false;

    private store: LoginStore | undefined;

    @observable
    mostrarDialogo: boolean = false;

    constructor() {
        makeObservable(this);
        this.guardar = this.guardar.bind(this);
    }

    asignarStore(store: LoginStore){
        this.store = store;
    }

    @action.bound
    alternarDialogo(){
        this.mostrarDialogo = !this.mostrarDialogo;
    }

    @action.bound
    async obtenerCuentas(limite: number = 5){
        if (this.store && this.store.token) {
            this.loading = true;
            const requestLogic = new RequestLogic();
            let headers = new Headers();
            headers.set("Authorization", `Token ${this.store.token}`);
            const response = await requestLogic.realizarPeticion("control_gastos/cuentas/limit/5", headers, "GET");
            const responseBody = await response.json();
            this.mapResultados(responseBody);
        }
    }

    @action.bound
    mapResultados(responseBody: CuentaResponse[]){
        this.listaResultados = responseBody.map(cuenta => ({
            cuentaId: cuenta.cuenta_id,
            cuentaDebe: cuenta.cuenta_debe,
            cuentaHaber: cuenta.cuenta_haber,
            cuentaModificada: new Date(cuenta.cuenta_modificada),
            cuentaCreada: new Date(cuenta.cuenta_creada),
            cuentaTipo: cuenta.cuenta_tipo,
            cuentaNombre: cuenta.cuenta_nombre,
            cuentaUsuario: cuenta.nombre_usuario
        }));
        this.loading = false;
    }

    async guardar(nombre_cuenta:string, tipo_cuenta:string){
        if (this.store && this.store.token) {
            const requestLogic = new RequestLogic();
            let headers = new Headers();
            headers.set("Content-Type", "application/json");
            headers.set("Authorization", `Token ${this.store.token}`);
            const cuerpo = {
                cuenta_nombre: nombre_cuenta,
                cuenta_tipo: tipo_cuenta
            };
            const response = await requestLogic.realizarPeticion("control_gastos/cuentas", headers, "POST", cuerpo);
            if(response.ok){

            }
        }
    }
}
