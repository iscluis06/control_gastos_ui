import {useEffect, useState} from "react";
import {Button, Col, Container, Form, FormControl, FormSelect, Modal, Row} from "react-bootstrap";
import {SubcategoriaDialogoProps, SubcategoriaGuardar} from "../Types";
import CategoriaStore from "../../categoria/CategoriaStore";
import {TipoEntrada} from "../../dialogo/Types";
import {DialogoCreacionView} from "../../dialogo/DialogoCreacionView";
import {observer} from "mobx-react";

const categoriaModelo = new CategoriaStore();

export const SubcategoriaDialogo = observer(({mostrarDialogo, alternarDialogo, guardar}:SubcategoriaDialogoProps) => {
    let opciones: JSX.Element[] = [];
    const {listaResultados:categorias} = categoriaModelo;

    useEffect(() => {
        categoriaModelo.obtenerCategorias(0);
    },[]);

    opciones.push(<option defaultChecked>Seleccione una opción</option>);
    const opcionesCategoria = categorias?.map(categoria => <option value={categoria.categoriaId}>{categoria.categoriaNombre}</option>);
    opciones = opciones.concat(opcionesCategoria);

    console.dir(categorias);
    console.dir(opcionesCategoria);
    console.dir(opciones);

    const tipoEntrada: TipoEntrada[] = [
        {
            etiqueta: "Nombre subcategoría",
            tipoEntrada: "text",
            valorInicial: "",
            nombreEntrada: "subcategoriaNombre"
        },
        {
            etiqueta: "Categoría",
            tipoEntrada: "select",
            valorInicial: "",
            nombreEntrada: "subcategoriaCategoria",
            options: opciones
        }
    ];


    return <DialogoCreacionView<SubcategoriaGuardar> ocultar={alternarDialogo} mostrar={mostrarDialogo} componentes={tipoEntrada} funcionGuardar={guardar} titulo={"Crear subcategoria"}/>
});
