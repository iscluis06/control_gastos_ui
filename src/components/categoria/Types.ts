import {CategoriaStore} from "./CategoriaStore";

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

export const MapeoPropiedades = {
    categoriaId: 'categoria_id',
    categoriaNombre: 'categoria_nombre',
    categoriaCreado: 'categoria_creado',
    categoriaModificado: 'categoria_modificado',
    categoriaUsuario: 'nombre_usuario'
};

export type CategoriaDialogoProps = {
    mostrarDialogo: boolean,
    alternarDialogo: () => void,
    guardar: (guardar: CategoriaGuardar) => void
}

export type CategoriaGuardar = {
    categoria_nombre: string
}

export type PanelCategoriaViewProps = {
    store: CategoriaStore
}
