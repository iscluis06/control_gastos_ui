import {Button, Col, Container, Form, FormControl, FormSelect, Modal, Row} from "react-bootstrap";
import {DialogoCrearCuentaProps} from "../Types";
import {observer} from "mobx-react";
import {useState} from "react";

export const DialogoCrearCuentaView = observer(({mostrarDialogo, alternarDialogo, guardar}: DialogoCrearCuentaProps) => {
    const [formulario, setFormulario] = useState({
            nombre_cuenta: '',
            tipo_cuenta: ''
        });

    return <Modal show={mostrarDialogo} onHide={() => {
        alternarDialogo()
    }}>
        <Modal.Header closeButton>
            <Modal.Title>
                Crear nueva cuenta
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container>
                <Form onSubmit={event => {
                    guardar(formulario.nombre_cuenta, formulario.tipo_cuenta);
                    setFormulario({tipo_cuenta: '', nombre_cuenta: ''})
                    event.preventDefault();
                }}>
                    <Row>
                        <Col>
                            <Form.Label htmlFor='nombre_cuenta'>Nombre cuenta</Form.Label>
                        </Col>
                        <Col>
                            <FormControl id='nombre_cuenta' value={formulario.nombre_cuenta} onChange={event => {
                                const {value} = event.target;
                                setFormulario(prevState => ({
                                    ...prevState,
                                    ['nombre_cuenta']: value
                                }));
                            }}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label htmlFor='tipo_cuenta'>Tipo cuenta</Form.Label>
                        </Col>
                        <Col>
                            <FormSelect id='tipo_cuenta' value={formulario.tipo_cuenta} onChange={event => {
                                const {value} = event.target;
                                setFormulario(prevState => ({
                                    ...prevState,
                                    ['tipo_cuenta']: value
                                }));
                            }}>
                                <option defaultChecked>Seleccione una opción</option>
                                <option value='A'>Activo</option>
                                <option value='P'>Pasivo</option>
                            </FormSelect>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={"auto"}>
                            <Button type={"submit"}>Guardar</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </Modal.Body>
    </Modal>
});
