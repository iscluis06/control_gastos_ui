import {Component, useContext, useEffect} from "react";
import CuentasModel from "../CuentasModel";
import {Carousel, Col, Container, Row, Spinner} from "react-bootstrap";
import {Cuenta} from "../Types";
import {observer} from "mobx-react";
import {LoginContext} from "../../../context/LoginContext";
import {TarjetaPanelView} from "../../tarjeta_panel/TarjetaPanelView";
import {DialogoCrearCuentaView} from "./DialogoCrearCuentaView";

const cuentasModel = new CuentasModel();

const CuentasFragment = (props: Cuenta) => {
    const {cuentaNombre, cuentaTipo, cuentaDebe, cuentaHaber} = props;
    return (<Container>
        <Row>
            <Col>
                <Row style={{marginBottom: '1em'}}>
                    <h3>{cuentaNombre}</h3>
                </Row>
                <Row>
                    <span style={{fontWeight: "bold"}}>{cuentaTipo == 'A' ? 'Activo' : 'Pasivo'}</span>
                    <hr/>
                </Row>
                <Row>
                    <Col style={{borderRight: '1px solid black'}}>
                        <Row>
                            <span>Debe</span>
                        </Row>
                        <Row style={{marginLeft: "auto", marginRight: 0, textAlign: "right"}}>
                                <span>{Intl.NumberFormat('es-MX', {
                                    style: 'currency',
                                    currency: 'MXN'
                                }).format(cuentaDebe)}</span>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <span>Haber</span>
                        </Row>
                        <Row style={{marginLeft: "auto", marginRight: 0, textAlign: "right"}}>
                                <span>{Intl.NumberFormat('es-MX', {
                                    style: 'currency',
                                    currency: 'MXN'
                                }).format(cuentaHaber)}</span>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>);
}


export const PanelCuentasView = observer(() => {
    const {store} = useContext(LoginContext);
    cuentasModel.asignarStore(store);


    useEffect(() => {
        cuentasModel.obtenerCuentas();
    },[])

    const {listaResultados, alternarDialogo, loading} = cuentasModel;
    return (
        <>
            <TarjetaPanelView mensajeNuevoAccion={alternarDialogo}
                              mensajeTodosAccion={alternarDialogo}
                              nombreTarjeta={"Cuentas"} mensajeTodos={"Ver todas"}
                              mensajeNuevo={"Nueva"} esCarousel={true}>
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
                {loading===false && listaResultados.length===0 && <TarjetaPanelView.Vacia mensaje={"Sin resultados"} />}
                {loading === false && listaResultados.map(resultado => {
                    return (<Carousel.Item>
                        <TarjetaPanelView.Entrada idElemento={resultado.cuentaId} botonIzquierda={true}
                                                  funcionIzquierda={(idElemento: number) => {
                                                  }}>
                            <CuentasFragment
                                cuentaDebe={resultado.cuentaDebe}
                                cuentaId={resultado.cuentaId}
                                cuentaHaber={resultado.cuentaHaber}
                                cuentaCreada={resultado.cuentaCreada}
                                cuentaTipo={resultado.cuentaTipo}
                                cuentaNombre={resultado.cuentaNombre}
                                cuentaModificada={resultado.cuentaModificada}
                                cuentaUsuario={resultado.cuentaUsuario}/>
                        </TarjetaPanelView.Entrada>
                    </Carousel.Item>);
                })}
            </TarjetaPanelView>
            <DialogoCrearCuentaView mostrarDialogo={cuentasModel.mostrarDialogo}
                                    alternarDialogo={cuentasModel.alternarDialogo} guardar={cuentasModel.guardar}/>
        </>);
});
