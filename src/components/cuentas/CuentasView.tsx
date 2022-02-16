import {TablaView} from "../tabla/TablaView";
import CuentasStore from "./CuentasStore";
import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {ComponenteProtegido} from "../ComponenteProtegido";

const cuentasModel = new CuentasStore();

export const CuentasView = observer(() => {

    useEffect(()=>{
        cuentasModel.obtenerCuentas(0);
    })

    const {listaResultados} = cuentasModel;

    const columnas: string[] = ["Nombre", "Monto", "Deuda", "Usuario", "Modificada", "Creada"];
    const filas: string[][] = listaResultados?.map(resultado => [resultado.cuentaNombre,Number(resultado.cuentaMonto).toFixed(2), resultado.cuentaDeuda ? "Si":"No", resultado.cuentaUsuario, new Date(resultado.cuentaModificada).toLocaleDateString(), new Date(resultado.cuentaCreada).toLocaleDateString()]) ?? [];

    return (
        <>
            <ComponenteProtegido />
            <TablaView columnas={columnas} filas={filas} />
        </>);
});
