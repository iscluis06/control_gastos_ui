import {useEffect, useState} from "react";
import {Button, Col, Container, Form, FormControl, FormSelect, Modal, Row} from "react-bootstrap";
import {SubcategoriaDialogoProps} from "../Types";
import CategoriaStore from "../../categoria/CategoriaStore";

const categoriaModelo = new CategoriaStore();

export const SubcategoriaDialogo = ({mostrarDialogo, alternarDialogo, guardar}:SubcategoriaDialogoProps) => {
    const [formulario, setFormulario] = useState({
        subcategoriaNombre: '',
        subcategoriaCategoria: 0
    });

    const {listaResultados:categorias} = categoriaModelo;

    useEffect(()=>{
        categoriaModelo.obtenerCategorias(0);
    },[]);

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
                        guardar(formulario.subcategoriaNombre, formulario.subcategoriaCategoria);
                        setFormulario({subcategoriaNombre: '', subcategoriaCategoria: 0});
                        event.preventDefault();
                    }}>
                        <Row>
                            <Col>
                                <Form.Label htmlFor='nombre_subcategoria'>Nombre subcategoría</Form.Label>
                            </Col>
                            <Col>
                                <FormControl id='nombre_subcategoria' value={formulario.subcategoriaNombre} onChange={event => {
                                    const {value} = event.target;
                                    setFormulario(prevState => ({
                                        ...prevState,
                                        ['subcategoriaNombre']: value
                                    }));
                                }}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label htmlFor='categoria'>Categoria</Form.Label>
                            </Col>
                            <Col>
                                <FormSelect id='categoria' value={formulario.subcategoriaCategoria} onChange={event => {
                                    const {value} = event.target;
                                    setFormulario(prevState => ({
                                        ...prevState,
                                        ['subcategoriaCategoria']: Number(value)
                                    }));
                                }}>
                                    <option defaultChecked>Seleccione una opción</option>
                                    {categorias?.map(categoria => {
                                        return (<option value={categoria.categoriaId}>{categoria.categoriaNombre}</option>)
                                    })}
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
        </Modal>);
}
