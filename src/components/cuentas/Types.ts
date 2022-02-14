import CuentasStore from "./CuentasStore";

export type Cuenta = {
    cuentaId: number,
    cuentaDeuda: boolean,
    cuentaMonto: number,
    cuentaNombre: string,
    cuentaCreada: Date,
    cuentaModificada: Date,
    cuentaUsuario: string
}

export type CuentaResponse = {
    cuenta_id: number,
    cuenta_deuda: boolean,
    cuenta_monto: number,
    cuenta_nombre: string,
    cuenta_creada: Date,
    cuenta_modificada: Date,
    nombre_usuario: string
}

export type CuentaGuardarTipo = {
    deuda: boolean,
    nombre: string,
    monto: number
}

export type CuentaCreacionView = {
    store: CuentasStore;
}
