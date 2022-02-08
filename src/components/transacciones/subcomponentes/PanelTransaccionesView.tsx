import {TarjetaPanelView} from "../../tarjeta_panel/TarjetaPanelView";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import {SubcategoriaDialogo} from "../../subcategoria/subcomponentes/SubcategoriaDialogo";
import {TransaccionesModel} from "../TransaccionesModel";
import {useContext, useEffect} from "react";
import {LoginContext} from "../../../context/LoginContext";
import { TransaccionDialogo } from "./TransaccionDialogo";
import {observer} from "mobx-react";

const transaccionModel = new TransaccionesModel();

export const PanelTransaccionesView = observer(() => {

    const {store} = useContext(LoginContext);
    transaccionModel.asignarStore(store);

    const {alternarDialogo, loading, mostrarDialogo, listaResultados, guardar} = transaccionModel;

    useEffect(() => {
        transaccionModel.obtenerTransacciones();
    },[]);

    return (
        <>
            <TarjetaPanelView nombreTarjeta={"Transacciones"} mensajeTodos={"Ver todas"} mensajeTodosAccion={() => {
            }} mensajeNuevo={"Nueva"} mensajeNuevoAccion={alternarDialogo} esCarousel={false}>
                {loading === false && listaResultados.length == 0 &&
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
                {loading === false && listaResultados.length > 0 && (
                    <TarjetaPanelView.Entrada botonIzquierda={true} funcionIzquierda={() => {
                    }} idElemento={1}>
                        <Container>
                            <Row>
                                <Col>Subcategoría</Col>
                                <Col>Cuenta</Col>
                                <Col>Cantidad</Col>
                                <Col>Tipo Movimiento</Col>
                                <Col>Fecha</Col>
                            </Row>
                            {listaResultados.map(transaccion => {
                                return (<Row>
                                    <Col>{transaccion.transaccionSubcategoria}</Col>
                                    <Col>{transaccion.transaccionCuenta}</Col>
                                    <Col>{transaccion.transaccionCantidad}</Col>
                                    <Col>{new Date(transaccion.transaccionFecha).toLocaleDateString()}</Col>
                                </Row>);
                            })}
                        </Container>
                    </TarjetaPanelView.Entrada>)}
            </TarjetaPanelView>
            <TransaccionDialogo mostrarDialogo={mostrarDialogo}
                                 alternarDialogo={alternarDialogo} guardar={guardar}/>
        </>)
});
