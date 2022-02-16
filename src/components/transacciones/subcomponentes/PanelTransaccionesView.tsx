import {TarjetaPanelView} from "../../tarjeta_panel/TarjetaPanelView";
import {Button, Col, Container, Row, Spinner} from "react-bootstrap";
import {useEffect} from "react";
import { TransaccionDialogo } from "./TransaccionDialogo";
import {observer} from "mobx-react";
import {PanelTransaccionesProps, Transaccion} from "../Types";
import {convertirAValorMonetario} from "../../../utils/Moneda";
import {DetalleTransaccionView} from "../../detalle_transaccion/DetalleTransaccionView";
import styles from './PanelTransaccionesView.module.css';


export const PanelTransaccionesView = observer(({store}:PanelTransaccionesProps) => {

    const {alternarDialogo, loading, mostrarDialogo, listaResultados, guardar, obtenerTransacciones} = store;

    useEffect(() => {
        obtenerTransacciones();
    },[]);

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
            <TarjetaPanelView nombreTarjeta={"Transacciones"} mensajeTodos={"Ver todas"} mensajeTodosAccion={() => {
            }} mensajeNuevo={"Nueva"} mensajeNuevoAccion={alternarDialogo} esCarousel={false}>
                {loading === false && listaResultados?.length == 0 &&
                <TarjetaPanelView.Vacia mensaje={"Sin resultados"}/>}
                {loading &&
                <Container>
                    <Row>
                        <Col>
                            <Spinner style={{display: "block", marginRight: "auto", marginLeft: "auto"}}
                                     animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </Col>
                    </Row>
                </Container>}
                {loading === false && listaResultados?.length > 0 && (
                    <TarjetaPanelView.Entrada >
                        <TarjetaPanelView.Tabla nombreTarjeta={"transaccion"} columnas={["Subcategoria","Cuenta","Cantidad","Fecha", "Detalle"]}
                                                info={infoMapping(listaResultados)} />
                    </TarjetaPanelView.Entrada>)}
            </TarjetaPanelView>
            <TransaccionDialogo mostrarDialogo={mostrarDialogo}
                                 alternarDialogo={alternarDialogo} guardar={guardar}/>
            <DetalleTransaccionView store={store.detalleTransaccion} />
        </>);
});
