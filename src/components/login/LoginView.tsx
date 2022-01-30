import {Component} from "react";
import LoginModel from "./LoginModel";
import {Button, Container, Form, Modal, Row} from "react-bootstrap";
import styles from './LoginView.module.css';
import {observer} from "mobx-react";

@observer
export default class LoginView extends Component<{viewModel: LoginModel}>{

    render(){
        const {usuario, contrasena, iniciarSesion, actualizarUsuario, actualizarContrasena} = this.props.viewModel;
        return(
            <Container fluid>
                <Row>
                    <Modal.Dialog>
                        <Modal.Header className={styles.centrar_texto}>Iniciar Sesión</Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="usuario">
                                    <Form.Label>Usuario</Form.Label>
                                    <Form.Control type="text"  placeholder="Usuario" value={usuario} onChange={actualizarUsuario}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="contrasena">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="Contraseña" value={contrasena} onChange={actualizarContrasena} />
                                </Form.Group>
                                <div className={styles.centrar_boton}>
                                    <Button onClick={iniciarSesion} variant="primary" type="button">Iniciar Sesión</Button>
                                </div>
                            </Form>
                        </Modal.Body>
                    </Modal.Dialog>
                </Row>
            </Container>
        )
    }
}
