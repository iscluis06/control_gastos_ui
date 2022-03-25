import {TarjetaPanelView} from "../../tarjeta_panel/TarjetaPanelView";
import {Button} from "react-bootstrap";
import { TransaccionDialogo } from "./TransaccionDialogo";
import {observer} from "mobx-react";
import {PanelTransaccionesProps, Transaccion} from "../Types";
import {convertirAValorMonetario} from "../../../utils/Moneda";
import {DetalleTransaccionView} from "../../detalle_transaccion/DetalleTransaccionView";
import styles from './PanelTransaccionesView.module.css';


export const PanelTransaccionesView = observer(({store}:PanelTransaccionesProps) => {

    const {alternarDialogo, cargando, mostrarDialogo, resultadosPanel, guardar} = store;

    const infoMapping = (transacciones: Transaccion[]) => {
        return transacciones.map(transaccion => [
            transaccion.transaccionSubcategoria,
            transaccion.transaccionCuenta,
            convertirAValorMonetario(transaccion.transaccionCantidad),
            new Date(transaccion.transaccionFecha).toLocaleDateString(),
            <Button className={styles.boton100} size={"sm"} onClick={()=>store.crearDetalle(transaccion.transaccionId, transaccion.detalleTransaccion)}>
                {transaccion.detalleTransaccion !== null ? 'Ver':'Crear'}
            </Button>]);
    }



    return (
        <>
            <TarjetaPanelView cargando={cargando} nombreTarjeta={"Transacciones"} mensajeTodos={"Ver todas"} enlaceTodos={"/transacciones"} mensajeNuevo={"Nueva"} mensajeNuevoAccion={alternarDialogo} esCarousel={false}>
                {cargando === false && resultadosPanel?.length == 0 &&
                <TarjetaPanelView.Vacia mensaje={"Sin resultados"}/>}
                {cargando === false && resultadosPanel?.length > 0 && (
                    <TarjetaPanelView.Entrada >
                        <TarjetaPanelView.Tabla nombreTarjeta={"transaccion"} columnas={["Subcategoria","Cuenta","Cantidad","Fecha", "Detalle"]}
                                                info={infoMapping(resultadosPanel)} />
                    </TarjetaPanelView.Entrada>)}
            </TarjetaPanelView>
            <TransaccionDialogo mostrarDialogo={mostrarDialogo}
                                 alternarDialogo={alternarDialogo} guardar={guardar}/>
            <DetalleTransaccionView store={store.detalleTransaccion} />
        </>);
});
