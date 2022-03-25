import {makeObservable, observable, action} from "mobx";
import {Cuenta, CuentaGuardarTipo, CuentaResponse, MapeoPropiedades} from "./Types";
import {requestLogic} from "../../RequestLogic";
import StorePanel from "../../clases/StorePanel";
import Observador from "../../clases/Observador";

export default class CuentasStore extends StorePanel<Cuenta, CuentaResponse>{
    relacionObjetos = MapeoPropiedades;
    mostrar: boolean = false;
    observador: Observador;

    constructor() {
        super("control_gastos/cuentas");
        makeObservable(this, {
            mostrar: observable,
            mostrarDialogo: action.bound,
            ocultarDialogo: action.bound
        });
        this.guardar = this.guardar.bind(this);
        this.observador = new Observador();
    }

    mostrarDialogo() {
        this.mostrar = true;
    }

    ocultarDialogo() {
        this.mostrar = false;
    }

    override async guardar({monto, nombre, deuda, callback} :CuentaGuardarTipo) {
        const cuerpo = {
            cuenta_nombre: nombre,
            cuenta_deuda: deuda,
            cuenta_monto: monto
        };
        const response: CuentaResponse = await requestLogic.realizarPeticion<CuentaResponse>(this.urlServicio, "POST", cuerpo);
        if (response !== undefined && response) {
            this.ocultarDialogo();
            await this.actualizarResultadosPanel();
            this.observador.dispararEvento('cuentasActualizadas');
        }
    }
}
