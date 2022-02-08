import {Component} from "react";
import LoginModel from "./LoginModel";
import {Button, Container, Form, Modal, Row, Toast} from "react-bootstrap";
import styles from './LoginView.module.css';
import {observer} from "mobx-react";
import {Navigate} from "react-router-dom";
import {DefaultProps} from "../../GlobalTypes";
import LoginContextProvider from "../../context/LoginContextProvider";
import {LoginContext} from "../../context/LoginContext";
import {Notificacion} from "../notificaciones/Notificacion";

@observer
export default class LoginView extends Component<DefaultProps<LoginModel>> {
    static contextType = LoginContext;

    render() {
        const {store} = this.context!;
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
        if (store != undefined) {
            actualizarLoginFunction(store.actualizarCredenciales);
        }
        return (
                <Container fluid>
                    { store !== undefined && store.token?.length > 0 && <Navigate to='/panel_control' />}
                    { error
                    &&  <Notificacion mostrarNotificacion={error}
                        tipoModal={"Danger"}
                        titulo={"Error"}
                        mensaje={"Ocurrio un error durante el login"}
                        cerrarNotificacion={reiniciarError} />}
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
        )
    }
}
