import {Button, Col, Container, Form, FormControl, FormSelect, Modal, Row} from "react-bootstrap";
import {observer} from "mobx-react";
import {useState} from "react";
import {DialogoCreacionViewProps, TipoEntrada} from "../../dialogo/Types";
import {DialogoCreacionView} from "../../dialogo/DialogoCreacionView";
import {CuentaCreacionView, CuentaGuardarTipo} from "../Types";

export const DialogoCrearCuentaView = observer(({store:{ocultarDialogo, mostrarDialogo,mostrar, guardar}}:CuentaCreacionView) => {
    const tiposEntrada: TipoEntrada[] = [
        {
            etiqueta: "Nombre",
            nombreEntrada: "nombre",
            valorInicial: '',
            tipoEntrada: 'text'
        },
        {
            etiqueta: "Deuda",
            nombreEntrada: "deuda",
            valorInicial: false,
            tipoEntrada: 'checkbox'
        },
        {
            etiqueta: "Monto",
            nombreEntrada: "monto",
            valorInicial: 0,
            tipoEntrada: 'number'
        }
    ]

    return <DialogoCreacionView<CuentaGuardarTipo> mostrar={mostrar} ocultar={ocultarDialogo} funcionGuardar={guardar} componentes={tiposEntrada} titulo={"Crear cuenta"} />
});
