import {Component, useContext, useEffect} from "react";
import {DefaultProps} from "../../GlobalTypes";
import BalanceModel from "./BalanceModel";
import {Col, Modal, Row} from "react-bootstrap";
import styles from './BalanceView.module.css';
import {LoginContext} from "../../context/LoginContext";
import {observer} from "mobx-react";

const balanceModel = new BalanceModel();

export const BalanceView = observer(() => {
    const {store} = useContext(LoginContext);

    balanceModel.asignarStore(store);

    useEffect(()=> {
        balanceModel.obtenerBalance();
    },[]);

    const {total, deuda, capital} = balanceModel;

    return (
        <Modal.Dialog>
            <Modal.Header>
                <Modal.Title className={styles.centerText}>Balance</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={9} xs={8}>Total Capital</Col>
                    <Col md={3} xs={4}>{capital}</Col>
                </Row>
                <Row>
                    <Col md={9} xs={8}>Total Deuda</Col>
                    <Col md={3} xs={4}>{deuda}</Col>
                </Row>
                <Row>
                    <Col md={9} xs={8}>Total</Col>
                    <Col md={3} xs={4}>{total}</Col>
                </Row>
            </Modal.Body>
        </Modal.Dialog>
    );
});
