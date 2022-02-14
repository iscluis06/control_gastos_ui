import {makeObservable, observable, computed, action} from "mobx";
import {Cuenta, CuentaGuardarTipo, CuentaResponse} from "./Types";
import {requestLogic} from "../../RequestLogic";
import {balanceStore} from "../balance/BalanceStore";

export default class CuentasStore {
    @observable
    listaResultados: Cuenta[] = [];

    @observable
    loading: boolean = false;

    @observable
    mostrar: boolean = false;

    constructor() {
        makeObservable(this);
        this.guardar = this.guardar.bind(this);
    }

    @action.bound
    mostrarDialogo() {
        this.mostrar = true;
    }

    @action.bound
    ocultarDialogo() {
        this.mostrar = false;
    }

    @action.bound
    async obtenerCuentas(limite: number = 5) {
        this.loading = true;
        const response: CuentaResponse[] = await requestLogic.realizarPeticion<CuentaResponse[]>(`control_gastos/cuentas/limit/${limite}`, "GET");
        this.mapResultados(response);
    }

    @action.bound
    mapResultados(responseBody: CuentaResponse[]) {
        this.listaResultados = responseBody?.map(cuenta => ({
            cuentaId: cuenta.cuenta_id,
            cuentaMonto: cuenta.cuenta_monto,
            cuentaDeuda: cuenta.cuenta_deuda,
            cuentaModificada: new Date(cuenta.cuenta_modificada),
            cuentaCreada: new Date(cuenta.cuenta_creada),
            cuentaNombre: cuenta.cuenta_nombre,
            cuentaUsuario: cuenta.nombre_usuario
        }));
        this.loading = false;
    }

    async guardar({monto, nombre, deuda} :CuentaGuardarTipo) {
        const cuerpo = {
            cuenta_nombre: nombre,
            cuenta_deuda: deuda,
            cuenta_monto: monto
        };
        const response: CuentaResponse = await requestLogic.realizarPeticion<CuentaResponse>("control_gastos/cuentas", "POST", cuerpo);
        if (response !== undefined && response) {
            this.ocultarDialogo();
            this.obtenerCuentas(0);
            balanceStore.obtenerBalance();
        }
    }
}
