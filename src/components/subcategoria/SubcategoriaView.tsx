import {observer} from "mobx-react";
import React, {useEffect} from "react";
import {ComponenteProtegido} from "../ComponenteProtegido";
import {TablaView} from "../tabla/TablaView";
import SubcategoriaStore from "./SubcategoriaStore";

const subcategoiraStore = new SubcategoriaStore();

export const SubcategoriaView = observer(() => {
    useEffect(()=>{
        subcategoiraStore.obtenerSubcategorias(0);
    })

    const {listaResultados} = subcategoiraStore;

    const columnas: string[] = ["Nombre", "Categoría", "Usuario", "Modificada", "Creada"];
    const filas: string[][] = listaResultados?.map(resultado => [resultado.subcategoriaNombre, resultado.nombreCategoria, resultado.nombreUsuario, new Date(resultado.subcategoriaModificado).toLocaleDateString(), new Date(resultado.subcategoriaCreado).toLocaleDateString()]) ?? [];

    return (
        <>
            <ComponenteProtegido />
            <TablaView columnas={columnas} filas={filas} />
        </>);
});
