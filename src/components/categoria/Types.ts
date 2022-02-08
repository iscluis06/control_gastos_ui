import {Cuenta} from "../cuentas/Types";

export type Categoria = {
    categoriaId: number,
    categoriaCuenta: Cuenta,
    categoriaNombre: string,
    categoriaCreado: Date,
    categoriaModificado: Date,
    categoriaUsuario: string
}

export type CategoriaResponse = {
    categoria_id: number,
    categoria_cuenta: Cuenta,
    categoria_nombre: string,
    categoria_creado: Date,
    categoria_modificado: Date,
    nombre_usuario: string
}

export type CategoriaDialogoProps = {
    mostrarDialogo: boolean,
    alternarDialogo: () => void,
    guardar: (categoriaNombre: string) => void
}
