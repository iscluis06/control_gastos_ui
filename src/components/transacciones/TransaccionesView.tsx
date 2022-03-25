import {observer} from "mobx-react";
import React, {useEffect} from "react";
import {ComponenteProtegido} from "../ComponenteProtegido";
import {TablaView} from "../comunes/tabla/TablaView";
import {TransaccionesStore} from "./TransaccionesStore";
import styles from "./subcomponentes/PanelTransaccionesView.module.css";
import {Button} from "react-bootstrap";
import {DetalleTransaccionView} from "../detalle_transaccion/DetalleTransaccionView";
import {TransaccionDialogo} from "./subcomponentes/TransaccionDialogo";

const transaccionesStore = new TransaccionesStore();

export const TransaccionesView = observer(() => {
    const { mostrarDialogo, alternarDialogo, guardar } = transaccionesStore;

    useEffect(()=>{
        const obtenerInfo = async() => {
            await transaccionesStore.actualizarResultados();
        };
        obtenerInfo();
    },[])

    const {listaResultados} = transaccionesStore;

    const columnas: string[] = ["Nombre cuenta", "Nombre subcategoría", "Monto", "Usuario", "Fecha", "Detalle", "Actualizar"];
    const filas: (string|JSX.Element)[][] = listaResultados?.map(resultado => [
        resultado.transaccionCuenta,
        resultado.transaccionSubcategoria,
        Number(resultado.transaccionCantidad).toFixed(2),
        resultado.transaccionUsuario, new Date(resultado.transaccionFecha).toLocaleDateString(),
        <Button className={styles.boton100} size={"sm"}
                onClick={()=>transaccionesStore.crearDetalle(resultado.transaccionId, resultado.detalleTransaccion)}>
            {resultado.detalleTransaccion !== null ? 'Ver':'Crear'}
        </Button>,
        <Button className={styles.boton100} size={"sm"}
                onClick={()=>transaccionesStore.definirDetalle(resultado)}>
            Modificar
        </Button>]) ?? [];

    return (
        <>
            <ComponenteProtegido />
            <TablaView columnas={columnas} filas={filas} />
            <DetalleTransaccionView store={transaccionesStore.detalleTransaccion} />
            <TransaccionDialogo mostrarDialogo={mostrarDialogo} detalle={transaccionesStore.detalle}
                                alternarDialogo={alternarDialogo} guardar={guardar}/>
        </>);
});
