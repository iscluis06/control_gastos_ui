import SubcategoriaStore from "./SubcategoriaStore";
import {CategoriaStore} from "../categoria/CategoriaStore";

export type Subcategoria = {
    subcategoriaId: number,
    subcategoriaCategoria: number,
    subcategoriaNombre: string,
    subcategoriaCreado: Date,
    subcategoriaModificado: Date,
    nombreUsuario: string,
    nombreCategoria: string
}

export type SubcategoriaResponse = {
    subcategoria_id: number,
    subcategoria_categoria: number,
    subcategoria_nombre: string,
    subcategoria_creado: Date,
    subcategoria_modificado: Date,
    nombre_usuario: string,
    nombre_categoria: string
}

export type SubcategoriaDialogoProps = {
    mostrarDialogo: boolean,
    alternarDialogo: () => void,
    guardar: ({subcategoriaNombre, subcategoriaCategoria}: SubcategoriaGuardar) => void,
    categoriaStore: CategoriaStore
}

export const MapeoPropiedades = {
    subcategoriaId: 'subcategoria_id',
    subcategoriaCategoria: 'subcategoria_categoria',
    subcategoriaNombre: 'subcategoria_nombre',
    subcategoriaCreado: 'subcategoria_creado',
    subcategoriaModificado: 'subcategoria_modificado',
    nombreUsuario: 'nombre_usuario',
    nombreCategoria: 'nombre_categoria'
};

export type SubcategoriaGuardar = {
    subcategoriaNombre: string,
    subcategoriaCategoria:number
}

export type PanelSubcategoriaViewProps = {
    store: SubcategoriaStore,
    categoriaStore: CategoriaStore
}
