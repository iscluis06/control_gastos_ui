import {TransaccionDialogoProps} from "../Types";
import {Button, Col, Container, Form, FormControl, FormSelect, Modal, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../../context/LoginContext";
import SubcategoriaModel from "../../subcategoria/SubcategoriaModel";
import CuentasModel from "../../cuentas/CuentasModel";

const subcategoriaModelo = new SubcategoriaModel();
const cuentaModelo = new CuentasModel();

export const TransaccionDialogo = ({mostrarDialogo, alternarDialogo, guardar}: TransaccionDialogoProps) => {
    const [formulario, setFormulario] = useState({
        subcategoria: 0,
        cuenta: 0,
        cantidad: 0
    });

    const {store} = useContext(LoginContext);
    subcategoriaModelo.asignarStore(store);
    cuentaModelo.asignarStore(store);

    const {listaResultados: subcategorias} = subcategoriaModelo;
    const {listaResultados: cuentas} = cuentaModelo;

    useEffect(() => {
        subcategoriaModelo.obtenerSubcategorias(-1);
        cuentaModelo.obtenerCuentas(-1);
    }, []);

    return (<Modal show={mostrarDialogo} onHide={() => {
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
                    guardar(formulario.subcategoria, formulario.cuenta, formulario.cantidad);
                    setFormulario({subcategoria: 0, cuenta: 0, cantidad: 0});
                    event.preventDefault();
                }}>
                    <Row>
                        <Col>
                            <Form.Label htmlFor='subcategoria'>Subcategoría</Form.Label>
                        </Col>
                        <Col>
                            <FormSelect id='subcategoria' value={formulario.subcategoria} onChange={event => {
                                const {value} = event.target;
                                setFormulario(prevState => ({
                                    ...prevState,
                                    ['subcategoria']: Number(value)
                                }));
                            }}>
                                <option defaultChecked>Seleccione una opción</option>
                                {subcategorias.map(subcategoria => {
                                    return (<option
                                        value={subcategoria.subcategoriaId}>{subcategoria.nombreCategoria}-{subcategoria.subcategoriaNombre}</option>)
                                })}
                            </FormSelect>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label htmlFor='cuenta'>Cuenta</Form.Label>
                        </Col>
                        <Col>
                            <FormSelect id='cuenta' value={formulario.cuenta} onChange={event => {
                                const {value} = event.target;
                                const attemptedParse = parseInt(value);
                                if (!Object.is(NaN, attemptedParse)) {
                                    setFormulario(prevState => ({
                                        ...prevState,
                                        ['cuenta']: attemptedParse
                                    }));
                                }
                            }}>
                                <option defaultChecked>Seleccione una opción</option>
                                {cuentas.map(cuentas => {
                                    return (<option value={cuentas.cuentaId}>{cuentas.cuentaNombre}</option>)
                                })}
                            </FormSelect>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label htmlFor='cantidad'>Cantidad</Form.Label>
                        </Col>
                        <Col>
                            <FormControl type="number" id='cantidad' value={formulario.cantidad} onChange={event => {
                                const {value} = event.target;
                                setFormulario(prevState => ({
                                    ...prevState,
                                    ['cantidad']: Number(value)
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
    </Modal>)
}
