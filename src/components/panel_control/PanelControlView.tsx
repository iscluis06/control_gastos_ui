import React, {useContext} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {BalanceView} from "../balance/BalanceView";
import BalanceModel from "../balance/BalanceModel";
import LoginContextProvider from "../../context/LoginContextProvider";
import {PanelCuentasView} from "../cuentas/subcomponents/PanelCuentasView";
import {ComponenteProtegido} from "../ComponenteProtegido";
import {PanelCategoriaView} from "../categoria/subcomponentes/PanelCategoriaView";
import {PanelSubcategoriaView} from "../subcategoria/subcomponentes/PanelSubcategoriaView";
import {PanelTransaccionesView} from "../transacciones/subcomponentes/PanelTransaccionesView";


export const PanelControlView = () => {
    return (<LoginContextProvider>
        <ComponenteProtegido />
        <Container fluid>
            <Row>
                <Col>
                    <BalanceView/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <PanelCuentasView/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <PanelCategoriaView />
                </Col>
            </Row>
            <Row>
                <Col>
                    <PanelSubcategoriaView />
                </Col>
            </Row>
            <Row>
                <Col>
                    <PanelTransaccionesView />
                </Col>
            </Row>
        </Container>
    </LoginContextProvider>);
};
