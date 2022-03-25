import {action, makeObservable, observable} from "mobx";
import {requestLogic} from "../../RequestLogic";
import {MapeoPropiedades, Transaccion, TransaccionGuardar, TransaccionResponse} from "./Types";
import DetalleTransaccionStore from "../detalle_transaccion/DetalleTransaccionStore";
import StorePanel from "../../clases/StorePanel";

export class TransaccionesStore extends StorePanel<Transaccion, TransaccionResponse> {
    relacionObjetos = MapeoPropiedades;
    mostrarDialogo: boolean = false;
    detalleTransaccion: DetalleTransaccionStore;


    constructor() {
        super('control_gastos/transacciones');
        makeObservable(this, {
            mostrarDialogo: observable,
            alternarDialogo: action.bound

        });
        this.detalleTransaccion = new DetalleTransaccionStore();
    }

    alternarDialogo() {
        this.mostrarDialogo = !this.mostrarDialogo;
    }

    definirDetalle(detalle: Transaccion){
        this.detalle = detalle;
        this.alternarDialogo();
    }

    crearDetalle(idTransaccion: number, transaccionDetalle: number){
        this.detalleTransaccion.asignarIdTransaccion(idTransaccion);
        this.detalleTransaccion.asignarIdDetalle(transaccionDetalle);
        this.detalleTransaccion.mostrarDialogo();
    }

    async guardar({subcategoria, cuenta, cantidad, id, callback}: TransaccionGuardar) {
        const cuerpo = {
            transaccion_subcategoria: subcategoria,
            transaccion_cuenta: cuenta,
            transaccion_cantidad: cantidad
        } as any;
        if(id){
            cuerpo['id'] = id;
        }
        const response: TransaccionResponse = await requestLogic.realizarPeticion<TransaccionResponse>(this.urlServicio, "POST", cuerpo);
        if (response !== undefined) {
            this.mostrarDialogo = false;
            await this.actualizarResultadosPanel();
            if (callback) {
                await callback();
            }
        }
    }
}
