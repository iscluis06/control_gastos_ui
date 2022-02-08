
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
    guardar: (subcategoriaNombre: string, subcategoriaCategoria: number) => void
}
