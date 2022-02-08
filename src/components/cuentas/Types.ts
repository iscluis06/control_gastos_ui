export type Cuenta = {
    cuentaId: number,
    cuentaTipo: string,
    cuentaDebe: number,
    cuentaHaber: number,
    cuentaNombre: string,
    cuentaCreada: Date,
    cuentaModificada: Date,
    cuentaUsuario: string
}

export type CuentaResponse = {
    cuenta_id: number,
    cuenta_tipo: string,
    cuenta_debe: number,
    cuenta_haber: number,
    cuenta_nombre: string,
    cuenta_creada: Date,
    cuenta_modificada: Date,
    nombre_usuario: string
}

export type DialogoCrearCuentaProps = {
    alternarDialogo: () => void,
    mostrarDialogo: boolean,
    guardar: (nombre_cuenta:string, tipo_cuenta:string) => void
}

