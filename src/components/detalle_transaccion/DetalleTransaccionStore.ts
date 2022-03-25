import {action, makeObservable, observable} from "mobx";
import {DetalleTransaccion, DetalleTransaccionGuardar, DetalleTransaccionResponse} from "./Types";
import {requestLogic} from "../../RequestLogic";

export default class DetalleTransaccionStore {
    columnas: string[] = ["Nombre", "Descripción", "Usuario", "Fecha"];

    mostrar: boolean = false;
    idTransaccion: number = 0
    idDetalle: number | undefined = undefined;
    detalle: DetalleTransaccion | undefined;
    guardado: boolean = false;

    constructor() {
        makeObservable(this, {
            mostrar: observable,
            idTransaccion: observable,
            idDetalle: observable,
            detalle: observable,
            guardado: observable,
            asignarIdDetalle: action.bound,
            mostrarDialogo: action.bound,
            ocultarDialogo: action.bound,
            obtenerDetalle: action.bound,
            mapearRespuesta: action.bound
        });
        this.guardar = this.guardar.bind(this);
        this.infoDetalle = this.infoDetalle.bind(this);
    }

    asignarIdTransaccion(idTransaccion: number) {
        this.idTransaccion = idTransaccion;
    }

    asignarIdDetalle(id: number) {
        this.idDetalle = id;
    }

    mostrarDialogo() {
        this.mostrar = true;
        if (this.idDetalle !== undefined) {
            this.obtenerDetalle();
        }
    }

    ocultarDialogo() {
        this.mostrar = false;
        this.idDetalle = undefined;
    }

    async obtenerDetalle() {
        const response: DetalleTransaccionResponse = await requestLogic.realizarPeticion<DetalleTransaccionResponse>(`control_gastos/detalletransacciones/${this.idDetalle}`, "GET");
        this.mapearRespuesta(response);
    }

    mapearRespuesta(detalle: DetalleTransaccionResponse) {
        this.detalle = {
            detalleTransaccionId: detalle.detalle_trasanccion_id,
            detalleTransaccionTransaccion: detalle.detalle_transaccion_transaccion,
            detalleTransaccionNombre: detalle.detalle_transaccion_nombre,
            detalleTransaccionDescripcion: detalle.detalle_transaccion_descripcion,
            detalleTransaccionFecha: detalle.detalle_transaccion_fecha,
            detalleTransaccionUsuario: detalle.detalle_transaccion_usuario,
            nombreUsuario: detalle.nombre_usuario
        }
    }

    infoDetalle(): string[][] {
        if (this.detalle !== undefined) {
            return [
                [
                    this.detalle.detalleTransaccionNombre,
                    this.detalle.detalleTransaccionDescripcion,
                    this.detalle.nombreUsuario,
                    new Date(this.detalle.detalleTransaccionFecha).toLocaleDateString()
                ]
            ];
        } else {
            return [];
        }
    }

    async guardar(datos: DetalleTransaccionGuardar, callback?: () => Promise<void>) {
        const cuerpo = {
            detalle_transaccion_nombre: datos.nombre,
            detalle_transaccion_descripcion: datos.descripcion,
            detalle_transaccion_transaccion: this.idTransaccion
        };
        const response: DetalleTransaccionResponse = await requestLogic.realizarPeticion(`control_gastos/detalletransacciones`, "POST", cuerpo);
        if (response !== undefined) {
            if(callback) {
                await callback();
            }
            this.guardado = true;
            this.ocultarDialogo();
        }
    }
}
