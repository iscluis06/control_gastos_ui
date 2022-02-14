import DetalleTransaccionStore from "./DetalleTransaccionStore";

export type DetalleTransaccion = {
    detalleTransaccionId: number,
    detalleTransaccionTransaccion: number,
    detalleTransaccionNombre: string,
    detalleTransaccionDescripcion: string,
    detalleTransaccionFecha: Date,
    detalleTransaccionUsuario: number,
    nombreUsuario: string
}

export type DetalleTransaccionResponse = {
    detalle_trasanccion_id: number,
    detalle_transaccion_transaccion: number,
    detalle_transaccion_nombre: string,
    detalle_transaccion_descripcion: string,
    detalle_transaccion_fecha: Date,
    detalle_transaccion_usuario: number,
    nombre_usuario: string
}

export type DialogoDetalleTransaccionView = {
    transaccionDetalleId: number,
    transaccionId: number
}

export type DetalleTransacionProps = {
    store: DetalleTransaccionStore
}

export type DetalleTransaccionGuardar = {
    nombre: string,
    descripcion: string
}
