import {TransaccionesStore} from "./TransaccionesStore";

export type Transaccion = {
    transaccionId: number,
    transaccionSubcategoria: string
    transaccionCuenta: string,
    transaccionFecha: Date,
    transaccionCantidad: number,
    transaccionUsuario: string,
    detalleTransaccion: number
}

export type TransaccionResponse = {
    transaccion_id: number,
    transaccion_subcategoria: number,
    transaccion_cuenta: number,
    transaccion_fecha: Date,
    transaccion_cantidad: number,
    nombre_usuario: string,
    nombre_cuenta: string,
    nombre_subcategoria: string,
    detalle_transaccion: number
}

export const MapeoPropiedades = {
    transaccionId: 'transaccion_id',
    transaccionSubcategoria: 'transaccion_subcategoria',
    transaccionCuenta: 'transaccion_cuenta',
    transaccionFecha: 'transaccion_fecha',
    transaccionCantidad: 'transaccion_cantidad',
    transaccionUsuario: 'nombre_usuario',
    detalleTransaccion: 'detalle_transaccion'
}

export type TransaccionDialogoProps = {
    mostrarDialogo: boolean,
    alternarDialogo: ()=>void,
    guardar: ({subcategoria, cuenta, cantidad}:TransaccionGuardar) => void,
    detalle?: Transaccion
}

export type PanelTransaccionesProps = {
    store: TransaccionesStore;
}

export type TransaccionGuardar = {
    subcategoria: number,
    cuenta:number,
    cantidad: number,
    id?: number,
    callback?: () => Promise<void>
}
