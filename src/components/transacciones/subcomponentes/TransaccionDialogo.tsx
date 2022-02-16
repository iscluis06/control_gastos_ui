import {TransaccionDialogoProps, TransaccionGuardar} from "../Types";
import {Button, Col, Container, Form, FormControl, FormSelect, Modal, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import SubcategoriaStore from "../../subcategoria/SubcategoriaStore";
import CuentasStore from "../../cuentas/CuentasStore";
import {observer} from "mobx-react";
import {TipoEntrada} from "../../dialogo/Types";
import {DialogoCreacionView} from "../../dialogo/DialogoCreacionView";

const subcategoriaModelo = new SubcategoriaStore();
const cuentaModelo = new CuentasStore();

export const TransaccionDialogo = observer(({mostrarDialogo, alternarDialogo, guardar}: TransaccionDialogoProps) => {
    const {listaResultados: subcategorias} = subcategoriaModelo;
    const {listaResultados: cuentas} = cuentaModelo;
    let opcionesSubcategoria: JSX.Element[] = [];
    let opcionesCuenta: JSX.Element[] = [];

    useEffect(() => {
        subcategoriaModelo.obtenerSubcategorias(0);
        cuentaModelo.obtenerCuentas(0);
    }, []);

    opcionesSubcategoria.push(<option defaultChecked>Seleccione una opción</option>);
    opcionesSubcategoria = opcionesSubcategoria.concat(subcategorias?.map(subcategoria => <option value={subcategoria.subcategoriaId}>{subcategoria.nombreCategoria}-{subcategoria.subcategoriaNombre}</option>));

    opcionesCuenta.push(<option defaultChecked>Seleccione una opción</option>);
    opcionesCuenta = opcionesCuenta.concat(cuentas?.map(cuentas => <option value={cuentas.cuentaId}>{cuentas.cuentaNombre}</option>));

    const tipoEntrada: TipoEntrada[] = [
        {
            etiqueta: "Subcategoria",
            nombreEntrada: "subcategoria",
            tipoEntrada: "select",
            valorInicial: 0,
            options: opcionesSubcategoria
        },
        {
            etiqueta: "Cuenta",
            nombreEntrada: "cuenta",
            tipoEntrada: "select",
            valorInicial: 0,
            options: opcionesCuenta
        },
        {
            etiqueta: "Monto",
            nombreEntrada: "cantidad",
            tipoEntrada: "number",
            valorInicial: 0
        }
    ]

    return <DialogoCreacionView<TransaccionGuardar> funcionGuardar={guardar} componentes={tipoEntrada} titulo={"Crear transacción"} mostrar={mostrarDialogo} ocultar={alternarDialogo} />
});
