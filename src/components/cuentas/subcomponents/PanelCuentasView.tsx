import { useEffect} from "react";
import CuentasStore from "../CuentasStore";
import {Carousel, Col, Container, Row, Spinner} from "react-bootstrap";
import {Cuenta} from "../Types";
import {observer} from "mobx-react";
import {TarjetaPanelView} from "../../tarjeta_panel/TarjetaPanelView";
import {DialogoCrearCuentaView} from "./DialogoCrearCuentaView";
import {convertirAValorMonetario} from "../../../utils/Moneda";

const cuentasModel = new CuentasStore();

const CuentasFragment = (props: Cuenta) => {
    const {cuentaNombre, cuentaMonto, cuentaDeuda} = props;
    return (<Container>
        <Row>
            <Col>
                <Row style={{marginBottom: '1em'}}>
                    <h3>{cuentaNombre}</h3>
                </Row>
                <Row>
                    <TarjetaPanelView.Tabla nombreTarjeta={cuentaNombre} columnas={["Monto", "Deuda"]} info={[[convertirAValorMonetario(cuentaMonto),(cuentaDeuda ? 'Si':'No')]]} />
                </Row>
            </Col>
        </Row>
    </Container>);
}


export const PanelCuentasView = observer(() => {


    useEffect(() => {
        cuentasModel.obtenerCuentas();
    },[])

    const {listaResultados, mostrarDialogo, loading} = cuentasModel;
    return (
        <>
            <TarjetaPanelView mensajeNuevoAccion={mostrarDialogo}
                              enlaceTodos={"/cuentas"}
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
                {loading===false && listaResultados?.length===0 && <TarjetaPanelView.Vacia mensaje={"Sin resultados"} />}
                {loading === false && listaResultados?.map(resultado => {
                    return (<Carousel.Item>
                        <TarjetaPanelView.Entrada>
                            <CuentasFragment
                                cuentaDeuda={resultado.cuentaDeuda}
                                cuentaId={resultado.cuentaId}
                                cuentaMonto={resultado.cuentaMonto}
                                cuentaCreada={resultado.cuentaCreada}
                                cuentaNombre={resultado.cuentaNombre}
                                cuentaModificada={resultado.cuentaModificada}
                                cuentaUsuario={resultado.cuentaUsuario}/>
                        </TarjetaPanelView.Entrada>
                    </Carousel.Item>);
                })}
            </TarjetaPanelView>
            <DialogoCrearCuentaView store={cuentasModel}/>
        </>);
});
