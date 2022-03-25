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

export const MapeoPropiedades = {
    cuentaId: 'cuenta_id',
    cuentaDeuda: 'cuenta_deuda',
    cuentaMonto: 'cuenta_monto',
    cuentaNombre: 'cuenta_nombre',
    cuentaCreada: 'cuenta_creada',
    cuentaModificada: 'cuenta_modificada',
    cuentaUsuario: 'nombre_usuario'
};

export type CuentaGuardarTipo = {
    deuda: boolean,
    nombre: string,
    monto: number,
    callback?: () => Promise<void>
}

export type CuentaCreacionView = {
    store: CuentasStore;
}

export type PanelCuentasViewProps = {
    store: CuentasStore;
}
