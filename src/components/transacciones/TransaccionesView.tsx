import {observer} from "mobx-react";
import React, {useEffect} from "react";
import {ComponenteProtegido} from "../ComponenteProtegido";
import {TablaView} from "../tabla/TablaView";
import {TransaccionesStore} from "./TransaccionesStore";
import styles from "./subcomponentes/PanelTransaccionesView.module.css";
import {Button} from "react-bootstrap";
import {DetalleTransaccionView} from "../detalle_transaccion/DetalleTransaccionView";
import DetalleTransaccionStore from "../detalle_transaccion/DetalleTransaccionStore";

const transaccionesStore = new TransaccionesStore();

export const TransaccionesView = observer(() => {
    useEffect(()=>{
        transaccionesStore.obtenerTransacciones(0);
    },[])

    const {listaResultados} = transaccionesStore;

    const columnas: string[] = ["Nombre cuenta", "Nombre subcategoría", "Monto", "Usuario", "Fecha", "Detalle"];
    const filas: (string|JSX.Element)[][] = listaResultados?.map(resultado => [
        resultado.transaccionCuenta,
        resultado.transaccionSubcategoria,
        Number(resultado.transaccionCantidad).toFixed(2),
        resultado.transaccionUsuario, new Date(resultado.transaccionFecha).toLocaleDateString(),
        <Button className={styles.boton100} size={"sm"}
                onClick={()=>transaccionesStore.crearDetalle(resultado.transaccionId, resultado.detalleTransaccion)}>
            {resultado.detalleTransaccion !== null ? 'Ver':'Crear'}
        </Button>]) ?? [];

    return (
        <>
            <ComponenteProtegido />
            <TablaView columnas={columnas} filas={filas} />
            <DetalleTransaccionView store={transaccionesStore.detalleTransaccion} />
        </>);
});
