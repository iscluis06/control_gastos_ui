import {Cuenta} from "../cuentas/Types";

export type Categoria = {
    categoriaId: number,
    categoriaNombre: string,
    categoriaCreado: Date,
    categoriaModificado: Date,
    categoriaUsuario: string
}

export type CategoriaResponse = {
    categoria_id: number,
    categoria_nombre: string,
    categoria_creado: Date,
    categoria_modificado: Date,
    nombre_usuario: string
}

export type CategoriaDialogoProps = {
    mostrarDialogo: boolean,
    alternarDialogo: () => void,
    guardar: (guardar: CategoriaGuardar) => void
}

export type CategoriaGuardar = {
    categoria_nombre: string
}
