import {action, makeObservable, observable} from "mobx";
import {DetalleTransaccion, DetalleTransaccionGuardar, DetalleTransaccionResponse} from "./Types";
import {requestLogic} from "../../RequestLogic";

export default class DetalleTransaccionStore {
    columnas: string[] = ["Nombre", "Descripción", "Usuario", "Fecha"];

    callback: () => void;

    @observable
    mostrar: boolean = false;

    idTransaccion: number = 0
    @observable
    idDetalle: number | undefined = undefined;

    @observable
    detalle: DetalleTransaccion | undefined;

    @observable
    guardado: boolean = false;

    constructor(callback: () => void) {
        makeObservable(this);
        this.guardar = this.guardar.bind(this);
        this.infoDetalle = this.infoDetalle.bind(this);
        this.callback = callback;
    }

    asignarIdTransaccion(idTransaccion: number) {
        this.idTransaccion = idTransaccion;
    }

    @action
    asignarIdDetalle(id: number) {
        this.idDetalle = id;
    }

    @action.bound
    mostrarDialogo() {
        this.mostrar = true;
        if (this.idDetalle !== undefined) {
            this.obtenerDetalle();
        }
    }

    @action.bound
    ocultarDialogo() {
        this.mostrar = false;
        this.idDetalle = undefined;
    }

    @action.bound
    async obtenerDetalle() {
        const response: DetalleTransaccionResponse = await requestLogic.realizarPeticion<DetalleTransaccionResponse>(`control_gastos/detalletransacciones/${this.idDetalle}`, "GET");
        this.mapearRespuesta(response);
    }

    @action.bound
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

    async guardar(datos: DetalleTransaccionGuardar) {
        const cuerpo = {
            detalle_transaccion_nombre: datos.nombre,
            detalle_transaccion_descripcion: datos.descripcion,
            detalle_transaccion_transaccion: this.idTransaccion
        };
        const response: DetalleTransaccionResponse = await requestLogic.realizarPeticion(`control_gastos/detalletransacciones`, "POST", cuerpo);
        if (response !== undefined) {
            this.callback();
            this.guardado = true;
            this.ocultarDialogo();
        }
    }
}
