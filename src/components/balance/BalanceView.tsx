import {useEffect} from "react";
import {Col, Modal, Row} from "react-bootstrap";
import styles from './BalanceView.module.css';
import {observer} from "mobx-react";
import {convertirAValorMonetario} from "../../utils/Moneda";
import {BalanceViewProps} from "./Types";

export const BalanceView = observer(({store}: BalanceViewProps) => {

    const {total, deuda, capital} = store;

    return (
        <Modal.Dialog>
            <Modal.Header>
                <Modal.Title className={styles.centerText}>Balance</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>Total Capital</Col>
                    <Col className={styles.textoDerecha}>{convertirAValorMonetario(capital)}</Col>
                </Row>
                <Row>
                    <Col>Total Deuda</Col>
                    <Col className={styles.textoDerecha}>{convertirAValorMonetario(deuda)}</Col>
                </Row>
                <Row>
                    <Col>Total</Col>
                    <Col className={styles.textoDerecha}>{convertirAValorMonetario(total)}</Col>
                </Row>
            </Modal.Body>
        </Modal.Dialog>
    );
});
