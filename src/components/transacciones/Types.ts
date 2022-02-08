
export type Transaccion = {
    transaccionId: number,
    transaccionSubcategoria: string
    transaccionCuenta: string,
    transaccionFecha: Date,
    transaccionCantidad: number,
    transaccionUsuario: string
}

export type TransaccionResponse = {
    transaccion_id: number,
    transaccion_subcategoria: number,
    transaccion_cuenta: number,
    transaccion_fecha: Date,
    transaccion_cantidad: number,
    nombre_usuario: string,
    nombre_cuenta: string,
    nombre_subcategoria: string
}

export type TransaccionDialogoProps = {
    mostrarDialogo: boolean,
    alternarDialogo: ()=>void,
    guardar: (subcategoria: number, cuenta:number, cantidad: number) => void
}
