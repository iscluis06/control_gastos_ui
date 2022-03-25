import React, {useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {BalanceView} from "../balance/BalanceView";
import {PanelCuentasView} from "../cuentas/subcomponents/PanelCuentasView";
import {ComponenteProtegido} from "../ComponenteProtegido";
import {PanelCategoriaView} from "../categoria/subcomponentes/PanelCategoriaView";
import {PanelSubcategoriaView} from "../subcategoria/subcomponentes/PanelSubcategoriaView";
import {PanelTransaccionesView} from "../transacciones/subcomponentes/PanelTransaccionesView";
import {PanelControlProps} from "./Types";
import {Selector} from "../comunes/formulario/Selector";

const tamanoTarjetaMd = {offset:1, span:4};
const tamanoTarjetaCh = {span:12};

export const PanelControlView = ({store: {balanceStore, subcategoriaStore, categoriaStore, cuentasStore, transaccionesStore}}: PanelControlProps) => {
    useEffect( () => {
       const obtenerInfo: () => Promise<void> = async() => {
           await balanceStore.obtenerBalance();
           await subcategoriaStore.actualizarResultadosPanel();
           await categoriaStore.actualizarResultadosPanel();
           await cuentasStore.actualizarResultadosPanel();
           await transaccionesStore.actualizarResultadosPanel();
           return Promise.resolve();
       }
       obtenerInfo();
    });

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
                    <PanelCuentasView store={cuentasStore}/>
                </Col>
                <Col md={tamanoTarjetaMd} xs={tamanoTarjetaCh}>
                    <PanelCategoriaView store={categoriaStore} />
                </Col>
                <Col md={tamanoTarjetaMd} xs={tamanoTarjetaCh}>
                    <PanelSubcategoriaView store={subcategoriaStore} categoriaStore={categoriaStore} />
                </Col>
                <Col md={tamanoTarjetaMd} xs={tamanoTarjetaCh}>
                    <PanelTransaccionesView store={transaccionesStore}/>
                </Col>
            </Row>
        </Container>
    </>);
};
