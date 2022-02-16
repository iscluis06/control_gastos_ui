import {Button, Col, Container, Form, FormControl,  Modal, Row} from "react-bootstrap";
import {CategoriaDialogoProps, CategoriaGuardar} from "../Types";
import {useState} from "react";
import {TipoEntrada} from "../../dialogo/Types";
import {DialogoCreacionView} from "../../dialogo/DialogoCreacionView";


export const CategoriaDialogo = ({mostrarDialogo, alternarDialogo, guardar}:CategoriaDialogoProps) => {
    const tipoEntrada: TipoEntrada[] = [
        {
            etiqueta: "Nombre categoría",
            nombreEntrada: "categoria_nombre",
            valorInicial: "",
            tipoEntrada: "text"
        }
    ]

    return <DialogoCreacionView<CategoriaGuardar> titulo={"Crear categoría"} funcionGuardar={guardar} componentes={tipoEntrada} mostrar={mostrarDialogo} ocultar={alternarDialogo} />
}
