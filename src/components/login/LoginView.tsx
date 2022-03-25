import {Button, Container, Form, Modal, Row} from "react-bootstrap";
import styles from './LoginView.module.css';
import {observer} from "mobx-react";
import {Navigate} from "react-router-dom";
import {Notificacion} from "../comunes/notificaciones/Notificacion";
import {requestLogic} from "../../RequestLogic";
import {LoginViewProps} from "./Types";

export const LoginView =  observer(({store}: LoginViewProps) => {

        const {
            usuario,
            contrasena,
            actualizarUsuario,
            actualizarContrasena,
            error,
            actualizarError,
            iniciarSesion
        } = store;
        return (
                <Container fluid>
                    { requestLogic.token?.length > 0 && <Navigate to='/panel_control' />}
                    { error
                    &&  <Notificacion mostrarNotificacion={error}
                        tipoModal={"Danger"}
                        titulo={"Error"}
                        mensaje={"Ocurrio un error durante el login"}
                        cerrarNotificacion={() => actualizarError(false)} />}
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
                                        <Button onClick={() => iniciarSesion()} variant="primary" type="button">Iniciar
                                            Sesión</Button>
                                    </div>
                                </Form>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Row>
                </Container>
        );
});
