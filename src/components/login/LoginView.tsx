import {Component} from "react";
import LoginModel from "./LoginModel";
import {Button, Container, Form, Modal, Row, Toast} from "react-bootstrap";
import styles from './LoginView.module.css';
import {inject, observer} from "mobx-react";
import {LoginStore} from "../../stores/LoginStore";
import {Navigate} from "react-router-dom";

@inject('store')
@observer
export default class LoginView extends Component<{ store?: LoginStore, viewModel: LoginModel }> {

    render() {
        const {store} = this.props;
        const {
            usuario,
            contrasena,
            iniciarSesion,
            actualizarUsuario,
            actualizarContrasena,
            actualizarLoginFunction,
            error,
            reiniciarError
        } = this.props.viewModel;
        if (store != undefined)
            actualizarLoginFunction(store.actualizarCredenciales);
        return (
            <>
                <Container fluid>
                    <Row>
                        <Modal.Dialog>
                            <Modal.Header className={styles.centrar_texto}>Iniciar Sesión</Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="usuario">
                                        <Form.Label>Usuario</Form.Label>
                                        <Form.Control type="text" placeholder="Usuario" value={usuario}
                                                      onChange={actualizarUsuario}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="contrasena">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control type="password" placeholder="Contraseña" value={contrasena}
                                                      onChange={actualizarContrasena}/>
                                    </Form.Group>
                                    <div className={styles.centrar_boton}>
                                        <Button onClick={iniciarSesion} variant="primary" type="button">Iniciar
                                            Sesión</Button>
                                    </div>
                                </Form>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Row>
                </Container>
                { error &&
                (<Toast className="d-inline-block m-1" bg="Danger" onClose={reiniciarError}>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body>
                        Ocurrio un error durante el login.
                    </Toast.Body>
                </Toast>) }
                { store !== undefined && store.token.length > 0 && <Navigate to={'panel_control'} />}
            </>
        )
    }
}
