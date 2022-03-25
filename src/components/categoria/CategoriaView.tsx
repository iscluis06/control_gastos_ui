import {observer} from "mobx-react";
import React, {useEffect} from "react";
import {ComponenteProtegido} from "../ComponenteProtegido";
import {TablaView} from "../comunes/tabla/TablaView";
import {CategoriaStore} from "./CategoriaStore";

const categoriaStore = new CategoriaStore();

export const CategoriaView = observer(() => {

    useEffect(()=>{
        const obtenerInfo = async() => {
            await categoriaStore.actualizarResultados();
        };
        obtenerInfo();
    }, []);

    const {listaResultados} = categoriaStore;

    const columnas: string[] = ["Nombre", "Usuario", "Modificada", "Creada"];
    const filas: string[][] = listaResultados?.map(resultado => [resultado.categoriaNombre, resultado.categoriaUsuario, new Date(resultado.categoriaModificado).toLocaleDateString(), new Date(resultado.categoriaCreado).toLocaleDateString()]) ?? [];

    return (
        <>
            <ComponenteProtegido />
            <TablaView columnas={columnas} filas={filas} />
        </>);
});
