import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {BalanceView} from "../balance/BalanceView";
import {balanceStore} from "../balance/BalanceStore";
import {PanelCuentasView} from "../cuentas/subcomponents/PanelCuentasView";
import {ComponenteProtegido} from "../ComponenteProtegido";
import {PanelCategoriaView} from "../categoria/subcomponentes/PanelCategoriaView";
import {PanelSubcategoriaView} from "../subcategoria/subcomponentes/PanelSubcategoriaView";
import {PanelTransaccionesView} from "../transacciones/subcomponentes/PanelTransaccionesView";
import {TransaccionesStore} from "../transacciones/TransaccionesStore";
import {DetalleTransaccionView} from "../detalle_transaccion/DetalleTransaccionView";

const tamanoTarjetaMd = {offset:1, span:4};
const tamanoTarjetaCh = {span:12};

const transaccionesStore = new TransaccionesStore();

export const PanelControlView = () => {
    return (<>
        <ComponenteProtegido />
        <Container fluid>
            <Row>
                <Col>
                    <BalanceView store={balanceStore}/>
                </Col>
            </Row>
            <Row>
                <Col md={tamanoTarjetaMd} xs={tamanoTarjetaCh}>
                    <PanelCuentasView/>
                </Col>
                <Col md={tamanoTarjetaMd} xs={tamanoTarjetaCh}>
                    <PanelCategoriaView />
                </Col>
                <Col md={tamanoTarjetaMd} xs={tamanoTarjetaCh}>
                    <PanelSubcategoriaView />
                </Col>
                <Col md={tamanoTarjetaMd} xs={tamanoTarjetaCh}>
                    <PanelTransaccionesView store={transaccionesStore}/>
                </Col>
            </Row>
        </Container>
    </>);
};
