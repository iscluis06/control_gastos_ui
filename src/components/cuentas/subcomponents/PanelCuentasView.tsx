import {Carousel, Col, Container, Row, Spinner} from "react-bootstrap";
import {Cuenta, PanelCuentasViewProps} from "../Types";
import {observer} from "mobx-react";
import {TarjetaPanelView} from "../../tarjeta_panel/TarjetaPanelView";
import {DialogoCrearCuentaView} from "./DialogoCrearCuentaView";
import {convertirAValorMonetario} from "../../../utils/Moneda";

const CuentasFragment = (props: Cuenta) => {
    const {cuentaNombre, cuentaMonto, cuentaDeuda} = props;
    return (<Container>
        <Row>
            <Col>
                <Row style={{marginBottom: '1em'}}>
                    <h3>{cuentaNombre}</h3>
                </Row>
                <Row>
                    <TarjetaPanelView.Tabla nombreTarjeta={cuentaNombre} columnas={["Monto", "Deuda"]}
                                            info={[[convertirAValorMonetario(cuentaMonto), (cuentaDeuda ? 'Si' : 'No')]]}/>
                </Row>
            </Col>
        </Row>
    </Container>);
}


export const PanelCuentasView = observer(({store}:PanelCuentasViewProps) => {
    const {resultadosPanel, mostrarDialogo, cargando} = store;
    return (
        <>
            <TarjetaPanelView mensajeNuevoAccion={mostrarDialogo}
                              enlaceTodos={"/cuentas"}
                              nombreTarjeta={"Cuentas"} mensajeTodos={"Ver todas"}
                              mensajeNuevo={"Nueva"} esCarousel={true} cargando={cargando}>
                {cargando === false && resultadosPanel?.length === 0 &&
                <TarjetaPanelView.Vacia mensaje={"Sin resultados"}/>}
                {cargando === false && resultadosPanel?.map(resultado => {
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
            <DialogoCrearCuentaView store={store}/>
        </>);
});
