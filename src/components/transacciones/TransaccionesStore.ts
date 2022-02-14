import {action, makeObservable, observable} from "mobx";
import RequestLogic, {requestLogic} from "../../RequestLogic";
import {Transaccion, TransaccionResponse} from "./Types";
import DetalleTransaccionStore from "../detalle_transaccion/DetalleTransaccionStore";
import {balanceStore} from "../balance/BalanceStore";

export class TransaccionesStore {
    @observable
    mostrarDialogo: boolean = false;

    @observable
    loading: boolean = false;

    @observable
    listaResultados: Transaccion[] = [];

    detalleTransaccion: DetalleTransaccionStore;


    constructor() {
        makeObservable(this);
        this.detalleTransaccion = new DetalleTransaccionStore(this.obtenerTransacciones);
    }

    @action.bound
    alternarDialogo() {
        this.mostrarDialogo = !this.mostrarDialogo;
    }

    crearDetalle(idTransaccion: number, transaccionDetalle: number){
        this.detalleTransaccion.asignarIdTransaccion(idTransaccion);
        this.detalleTransaccion.asignarIdDetalle(transaccionDetalle);
        this.detalleTransaccion.mostrarDialogo();
    }

    @action.bound
    async obtenerTransacciones(limit: number = 5) {
        this.loading = true;
        const response: TransaccionResponse[] = await requestLogic.realizarPeticion<TransaccionResponse[]>(`control_gastos/transacciones/limit/${limit}`, "GET");
        this.mapResultados(response);
    }

    @action.bound
    mapResultados(responseBody: TransaccionResponse[]) {
        this.listaResultados = responseBody?.map(transaccion => ({
            transaccionId: transaccion.transaccion_id,
            transaccionSubcategoria: transaccion.nombre_subcategoria,
            transaccionCuenta: transaccion.nombre_cuenta,
            transaccionFecha: transaccion.transaccion_fecha,
            transaccionCantidad: transaccion.transaccion_cantidad,
            transaccionUsuario: transaccion.nombre_usuario,
            detalleTransaccion: transaccion.detalle_transaccion
        }));
        this.loading = false;
    }

    @action.bound
    async guardar(subcategoria: number, cuenta: number, cantidad: number) {
        const cuerpo = {
            transaccion_subcategoria: subcategoria,
            transaccion_cuenta: cuenta,
            transaccion_cantidad: cantidad
        };
        const response: TransaccionResponse = await requestLogic.realizarPeticion<TransaccionResponse>("control_gastos/transacciones", "POST", cuerpo);
        if (response !== undefined) {
            this.mostrarDialogo = false;
            this.obtenerTransacciones();
            balanceStore.obtenerBalance();
        }
    }
}
