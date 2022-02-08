import {Button, Col, Container, Form, FormControl,  Modal, Row} from "react-bootstrap";
import {CategoriaDialogoProps} from "../Types";
import {useState} from "react";


export const CategoriaDialogo = ({mostrarDialogo, alternarDialogo, guardar}:CategoriaDialogoProps) => {
    const [formulario, setFormulario] = useState({
        categoriaNombre: ''
    });

    return (
        <Modal show={mostrarDialogo} onHide={() => {
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
                        guardar(formulario.categoriaNombre);
                        setFormulario({categoriaNombre: ''});
                        event.preventDefault();
                    }}>
                        <Row>
                            <Col>
                                <Form.Label htmlFor='nombre_categoria'>Nombre categoría</Form.Label>
                            </Col>
                            <Col>
                                <FormControl id='nombre_categoria' value={formulario.categoriaNombre} onChange={event => {
                                    const {value} = event.target;
                                    setFormulario(prevState => ({
                                        ...prevState,
                                        ['categoriaNombre']: value
                                    }));
                                }}/>
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
        </Modal>);
}
